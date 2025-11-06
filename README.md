# 📚 JavaScript Reference Guide

An interactive web application that serves as a reference guide to the most used JavaScript features, useful for when you are working on projects that involve Javascript. 

[![A Danny Blaker project badge](https://github.com/dannyblaker/dannyblaker.github.io/blob/main/danny_blaker_project_badge.svg)](https://github.com/dannyblaker/)

![JavaScript Guide](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat&logo=javascript)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

## ✨ Features

- **📖 25+ JavaScript features**:
  - Variables & Data Types
  - Functions (Arrow Functions, Default Parameters, Rest/Spread)
  - Arrays & Objects (Destructuring, Array Methods)
  - Async Programming (Promises, Async/Await)
  - Classes & OOP
  - Modules
  - Error Handling
  - Modern Operators (Optional Chaining, Nullish Coalescing)
  - Collections (Map, Set)
  - Metaprogramming (Proxy, Generators)
  - And more!

- **🎨 Interactive Interface**: 
  - Split-pane layout with sidebar navigation
  - Syntax-highlighted code examples
  - Copy-to-clipboard functionality
  - Real-time search functionality
  - Categorized features for easy browsing

- **🚀 One-Command Deployment**: Run the entire application with just `docker compose up`

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Code Highlighting**: Highlight.js
- **Web Server**: Nginx (Alpine)
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher)

## 🚀 Quick Start

1. **Clone or navigate to the repository**:
   ```bash
   cd /home/d/Documents/javascript_guide
   ```

2. **Run the application**:
   ```bash
   docker compose up
   ```

3. **Access the application**:
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. **Stop the application**:
   Press `Ctrl+C` in the terminal, or run:
   ```bash
   docker compose down
   ```

## 📂 Project Structure

```
javascript_guide/
├── index.html          # Main HTML structure
├── styles.css          # Application styling
├── app.js             # Application logic
├── features.js        # JavaScript features database
├── nginx.conf         # Nginx server configuration
├── Dockerfile         # Docker container definition
├── docker-compose.yml # Docker Compose configuration
└── README.md          # This file
```

## 🎯 Usage

### Browsing Features

1. **Navigate**: Click on any feature in the left sidebar to view its details
2. **Search**: Use the search box to filter features by name, category, or description
3. **Copy Code**: Click the "📋 Copy" button to copy code examples to clipboard
4. **Categories**: Features are organized into logical categories for easy navigation

### Featured Categories

- **Variables**: var, let, const, scoping
- **Data Types**: Primitives, type checking
- **Functions**: Arrow functions, default parameters, rest/spread
- **Arrays**: Methods like map, filter, reduce, destructuring
- **Objects**: Object literals, destructuring, optional chaining
- **Strings**: Template literals
- **Async**: Promises, async/await
- **Classes**: ES6 classes, inheritance, private fields
- **Modules**: Import/export syntax
- **Collections**: Map, Set, WeakMap, WeakSet
- **Iterators**: Generators, custom iterators
- **Operators**: Nullish coalescing, optional chaining
- **Metaprogramming**: Proxy, Reflect
- **Error Handling**: Try/catch, custom errors

## 🔧 Development

### Running Without Docker

If you want to run the application without Docker:

1. Install a local web server (e.g., Python's http.server):
   ```bash
   python3 -m http.server 3000
   ```

2. Open `http://localhost:3000` in your browser

### Rebuilding the Docker Image

If you make changes to the code:

```bash
docker compose up --build
```

## 🎨 Customization

### Adding New Features

Edit `features.js` and add new feature objects following this structure:

```javascript
{
    id: 'unique-id',
    category: 'Category Name',
    title: 'Feature Title',
    description: 'Feature description',
    code: `// Your code example here`,
    output: `Expected output`,
    notes: [
        'Important note 1',
        'Important note 2'
    ]
}
```

## 📝 License

This project is open source and available under the MIT License.