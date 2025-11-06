// Global state
let currentFeature = null;
let allFeatures = [];
let filteredFeatures = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadFeatures();
    setupEventListeners();
    initializeTheme();
});

// Load and organize features
function loadFeatures() {
    allFeatures = [...jsFeatures];
    filteredFeatures = [...allFeatures];

    // Update stats
    document.getElementById('totalFeatures').textContent = allFeatures.length;
    const categories = new Set(allFeatures.map(f => f.category));
    document.getElementById('totalCategories').textContent = categories.size;

    renderFeatureList(filteredFeatures);
}

// Render feature list in sidebar
function renderFeatureList(features) {
    const featureList = document.getElementById('featureList');
    featureList.innerHTML = '';

    // Group features by category
    const grouped = features.reduce((acc, feature) => {
        if (!acc[feature.category]) {
            acc[feature.category] = [];
        }
        acc[feature.category].push(feature);
        return acc;
    }, {});

    // Render each category
    Object.keys(grouped).sort().forEach(category => {
        const categoryGroup = document.createElement('div');
        categoryGroup.className = 'feature-category-group';

        const categoryHeader = document.createElement('div');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = category;
        categoryGroup.appendChild(categoryHeader);

        grouped[category].forEach(feature => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.textContent = feature.title;
            featureItem.dataset.id = feature.id;
            featureItem.addEventListener('click', () => showFeature(feature));
            categoryGroup.appendChild(featureItem);
        });

        featureList.appendChild(categoryGroup);
    });
}

// Show feature details
function showFeature(feature) {
    currentFeature = feature;

    // Update active state in sidebar
    document.querySelectorAll('.feature-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id === feature.id) {
            item.classList.add('active');
        }
    });

    // Hide welcome screen, show feature display
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('featureDisplay').style.display = 'block';

    // Populate feature details
    document.getElementById('featureTitle').textContent = feature.title;
    document.getElementById('featureCategory').textContent = feature.category;
    document.getElementById('featureDescription').textContent = feature.description;

    // Display code with syntax highlighting
    const codeElement = document.getElementById('codeExample');
    // Clear all classes and content, then re-add
    codeElement.className = '';
    codeElement.innerHTML = '';
    delete codeElement.dataset.highlighted;
    codeElement.className = 'language-javascript';
    codeElement.textContent = feature.code;
    hljs.highlightElement(codeElement);

    // Show output if available
    const outputSection = document.getElementById('outputSection');
    if (feature.output) {
        outputSection.style.display = 'block';
        document.getElementById('outputContent').textContent = feature.output;
    } else {
        outputSection.style.display = 'none';
    }

    // Show notes if available
    const notesSection = document.getElementById('notesSection');
    if (feature.notes && feature.notes.length > 0) {
        notesSection.style.display = 'block';
        const notesList = document.getElementById('notesList');
        notesList.innerHTML = '';
        feature.notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            notesList.appendChild(li);
        });
    } else {
        notesSection.style.display = 'none';
    }

    // Scroll to top of content area
    document.querySelector('.content-area').scrollTop = 0;
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        if (query === '') {
            filteredFeatures = [...allFeatures];
        } else {
            filteredFeatures = allFeatures.filter(feature =>
                feature.title.toLowerCase().includes(query) ||
                feature.description.toLowerCase().includes(query) ||
                feature.category.toLowerCase().includes(query)
            );
        }

        renderFeatureList(filteredFeatures);
    });

    // Copy code button
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', () => {
        const code = document.getElementById('codeExample').textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = '✓ Copied!';
            copyBtn.classList.add('copied');

            setTimeout(() => {
                copyBtn.textContent = '📋 Copy';
                copyBtn.classList.remove('copied');
            }, 2000);
        });
    });

    // Theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', toggleTheme);
}

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        updateThemeIcon('light');
        toggleHighlightTheme('light');
    }
}

// Toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    const isLight = body.classList.toggle('light-mode');
    const theme = isLight ? 'light' : 'dark';

    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
    toggleHighlightTheme(theme);

    // Re-highlight current code if visible
    if (currentFeature) {
        const codeElement = document.getElementById('codeExample');
        codeElement.className = '';
        codeElement.innerHTML = '';
        delete codeElement.dataset.highlighted;
        codeElement.className = 'language-javascript';
        codeElement.textContent = currentFeature.code;
        hljs.highlightElement(codeElement);
    }
}

// Update theme toggle icon
function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// Toggle highlight.js theme
function toggleHighlightTheme(theme) {
    const darkTheme = document.getElementById('theme-dark');
    const lightTheme = document.getElementById('theme-light');

    if (theme === 'light') {
        darkTheme.disabled = true;
        lightTheme.disabled = false;
    } else {
        darkTheme.disabled = false;
        lightTheme.disabled = true;
    }
}
