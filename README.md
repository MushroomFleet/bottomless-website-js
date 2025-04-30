# Bottomless.js

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue)](https://www.npmjs.com/package/bottomless)

A lightweight JavaScript library that creates an infinite vertical scrolling experience. Users can scroll endlessly in either direction, with the page content seamlessly looping.

**[View Demo](https://example.com/bottomless-demo)** | **[Documentation](#documentation)** | **[Installation](#installation)** | **[Quick Start](#quick-start)**

![Bottomless.js Demo](./assets/images/bottomless-demo.gif)

## Features

- 🔄 Infinite vertical scrolling in both directions
- 🎯 No dependencies, pure vanilla JavaScript (~5kb minified)
- 🧩 Easy to integrate with any existing website
- 📱 Fully responsive for all device sizes
- 🌓 Compatible with dark/light mode themes
- 🔌 Simple API with customization options
- 🚀 Performance optimized with minimal DOM manipulation

## Installation

### Option 1: Direct Download

Download the latest version from this repository and include it in your project:

```html
<script src="path/to/bottomless.min.js"></script>
```

### Option 2: CDN

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/username/bottomless@latest/dist/bottomless.min.js"></script>

<!-- Specific version -->
<script src="https://cdn.jsdelivr.net/gh/username/bottomless@1.0.0/dist/bottomless.min.js"></script>
```

### Option 3: npm

```bash
npm install bottomless
```

Then import it in your JavaScript:

```javascript
import Bottomless from 'bottomless';
```

## Quick Start

1. Include the script in your HTML:
   ```html
   <script src="path/to/bottomless.min.js"></script>
   ```

2. Wrap your page content in a container element:
   ```html
   <div class="page-content">
     <!-- All your page content goes here -->
     <header>...</header>
     <main>...</main>
     <footer>...</footer>
   </div>
   ```

3. Initialize Bottomless.js:
   ```html
   <script>
     const bottomless = new Bottomless({
       contentSelector: '.page-content'
     });
   </script>
   ```

That's it! Your page now has infinite scrolling.

## Step-by-Step Implementation Guide

### 1. Prepare Your HTML Structure

For Bottomless.js to work properly, your HTML should have a single container that wraps all the content that will be repeated during scrolling.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bottomless Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Optional: Fixed elements that should NOT be repeated -->
    <div class="fixed-element">This stays in place</div>
    
    <!-- This container and everything inside will be repeated -->
    <div class="page-content">
        <header>
            <h1>My Website</h1>
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
        
        <main>
            <section>
                <h2>Section 1</h2>
                <p>Your content here...</p>
            </section>
            
            <section>
                <h2>Section 2</h2>
                <p>More content here...</p>
            </section>
        </main>
        
        <footer>
            <p>&copy; 2025 My Website</p>
        </footer>
    </div>
    
    <!-- Include Bottomless.js -->
    <script src="path/to/bottomless.min.js"></script>
    <script>
        // Initialize after DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            const bottomless = new Bottomless({
                contentSelector: '.page-content'
            });
        });
    </script>
</body>
</html>
```

### 2. Add CSS Considerations

No special CSS is required, but here are some tips:

```css
/* Ensure your content has sufficient height */
.page-content {
    min-height: 100vh;
}

/* If using fixed elements outside the looping content */
.fixed-element {
    position: fixed;
    z-index: 1000;
    /* Your styling here */
}

/* Optional: Hide scrollbar but keep functionality */
body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;     /* Firefox */
}

body::-webkit-scrollbar {
    display: none;  /* Chrome, Safari, Opera */
}
```

### 3. Initialize with Options

```javascript
const bottomless = new Bottomless({
    // Required
    contentSelector: '.page-content',
    
    // Optional configuration
    showPageIndicator: true,          // Shows which page loop you're viewing
    maxClones: 3,                     // Maximum number of clones (performance)
    smoothTransition: true,           // Use smooth scrolling
    onPageChange: function(pageNum) { // Callback when page changes
        console.log('Now viewing page:', pageNum);
        // Track analytics, update UI, etc.
    }
});
```

### 4. Test and Debug

- Make sure your page has enough content to scroll
- Check browser console for any errors
- Test on different devices and browsers
- Verify that any interactive elements still work properly

## Advanced Usage

### Working with Fixed Elements

Elements that should remain fixed during scrolling (like navigation bars or floating buttons) should be placed outside the content container and styled with `position: fixed`.

```html
<!-- Fixed navigation that stays in place -->
<nav class="fixed-nav">
    <!-- Navigation links -->
</nav>

<!-- Content that will be repeated -->
<div class="page-content">
    <!-- Your repeating content -->
</div>
```

```css
.fixed-nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: white;
    /* Other styling */
}
```

### Handling Interactive Elements

If you have elements that need event listeners (like buttons, forms, etc.), consider using event delegation or placing critical interactive elements outside the looped content.

```javascript
// Using event delegation for elements inside looped content
document.addEventListener('click', function(event) {
    if (event.target.matches('.page-content .button-class')) {
        // Handle button click
    }
});
```

### Progress Indicator

Add a visual progress indicator to show users where they are in the content loop:

```html
<div class="scroll-progress" id="scroll-progress"></div>
```

```css
.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #6366F1, #22D3EE);
    z-index: 1001;
    width: 0%;
    transition: width 0.2s;
}
```

```javascript
// Update progress bar
window.addEventListener('scroll', function() {
    const pageHeight = document.querySelector('.page-content').offsetHeight;
    const scrollPosition = window.scrollY % pageHeight;
    const progress = (scrollPosition / pageHeight) * 100;
    
    document.getElementById('scroll-progress').style.width = progress + '%';
});
```

### Page Transitions

Add custom transitions between page loops:

```javascript
const bottomless = new Bottomless({
    contentSelector: '.page-content',
    onPageChange: function(pageNum) {
        // Create a flash effect
        const flash = document.createElement('div');
        flash.className = 'page-transition-flash';
        document.body.appendChild(flash);
        
        // Trigger animation
        setTimeout(() => {
            flash.classList.add('active');
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 500);
        }, 10);
    }
});
```

```css
.page-transition-flash {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0);
    pointer-events: none;
    z-index: 9999;
    transition: background 0.5s;
}

.page-transition-flash.active {
    background: rgba(255, 255, 255, 0.2);
}
```

## Documentation

### API Reference

#### Constructor

```javascript
const bottomless = new Bottomless(options);
```

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contentSelector` | String | `.page-content` | CSS selector for the content container to be looped |
| `showPageIndicator` | Boolean | `false` | Whether to show the current page indicator |
| `maxClones` | Number | `3` | Maximum number of clones to keep in the DOM |
| `smoothTransition` | Boolean | `true` | Whether to use CSS smooth scrolling for transitions |
| `onPageChange` | Function | `null` | Callback function when page changes, receives page number as argument |

#### Methods

##### destroy()

Removes all clones, event listeners, and restores the original page structure.

```javascript
// Remove the bottomless page effect
bottomless.destroy();
```

### Browser Support

Bottomless.js works in all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers on iOS and Android

## Examples

### Basic Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Bottomless.js Example</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .page-content {
            min-height: 100vh;
        }
        
        header {
            background: #4338CA;
            color: white;
            padding: 20px;
            text-align: center;
        }
        
        section {
            padding: 40px 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        
        footer {
            background: #4338CA;
            color: white;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="page-content">
        <header>
            <h1>Bottomless.js Demo</h1>
        </header>
        
        <section>
            <h2>Section 1</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </section>
        
        <section>
            <h2>Section 2</h2>
            <p>Ut enim ad minim veniam, quis nostrud exercitation...</p>
        </section>
        
        <footer>
            <p>&copy; 2025 Bottomless.js Demo</p>
        </footer>
    </div>
    
    <script src="../dist/bottomless.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const bottomless = new Bottomless({
                contentSelector: '.page-content'
            });
        });
    </script>
</body>
</html>
```

### Advanced Example with Page Indicators

See the `/examples` directory in this repository for more examples.

## Troubleshooting

### Content Jumps During Scrolling

- Check that your content has consistent height
- Ensure no elements have changing dimensions during scrolling
- Try setting `smoothTransition: true` in options

### Performance Issues

- Reduce the complexity of your page content
- Consider lowering `maxClones` value to 2
- Check for expensive animations or effects in your page

### Buttons or Links Stop Working

- Use event delegation for dynamically created elements
- Place critical interactive elements outside the looped content
- Check for conflicts with other JavaScript on your page

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by infinite scrolling concepts in modern web applications
- Thanks to all contributors and testers