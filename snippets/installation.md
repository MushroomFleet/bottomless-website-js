<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bottomless.js Installation Snippet</title>
    <style>
        body {
            font-family: monospace;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            line-height: 1.6;
        }
        
        .snippet {
            background-color: #f5f5f5;
            padding: 20px;
            border-radius: 5px;
            border: 1px solid #e0e0e0;
            overflow-x: auto;
        }
        
        h2 {
            margin-top: 40px;
        }
        
        .copy-button {
            background-color: #6366F1;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        
        .copy-button:hover {
            background-color: #4338CA;
        }
    </style>
</head>
<body>
    <h1>Bottomless.js Installation Snippets</h1>
    <p>Use these snippets to quickly integrate Bottomless.js into your website.</p>
    
    <h2>Basic Installation</h2>
    <div class="snippet">
        <pre><code>&lt;!-- Add this to your HTML page, preferably just before the closing &lt;/body&gt; tag --&gt;
&lt;script src="path/to/bottomless.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
    // Initialize the bottomless page
    const bottomless = new Bottomless({
        contentSelector: '.page-content', // Selector for your main content
        showPageIndicator: true,          // Show the page number indicator
        maxClones: 3,                     // Maximum number of clones to keep in DOM
        smoothTransition: true,           // Use smooth scrolling for transitions
        onPageChange: function(pageNum) { // Optional callback when page changes
            console.log('Now viewing page:', pageNum);
        }
    });
&lt;/script&gt;</code></pre>
    </div>
    <button class="copy-button" data-target="basic">Copy to Clipboard</button>
    
    <h2>CDN Installation</h2>
    <div class="snippet">
        <pre><code>&lt;!-- Add this to your HTML page, preferably just before the closing &lt;/body&gt; tag --&gt;
&lt;script src="https://cdn.jsdelivr.net/gh/username/bottomless@latest/dist/bottomless.min.js"&gt;&lt;/script&gt;
&lt;script&gt;
    document.addEventListener('DOMContentLoaded', function() {
        const bottomless = new Bottomless({
            contentSelector: '.page-content'
        });
    });
&lt;/script&gt;</code></pre>
    </div>
    <button class="copy-button" data-target="cdn">Copy to Clipboard</button>
    
    <h2>HTML Structure</h2>
    <div class="snippet">
        <pre><code>&lt;!-- Fixed elements that should NOT be repeated in the loop --&gt;
&lt;div class="fixed-elements"&gt;
    &lt;div class="progress-bar" id="progress-bar"&gt;&lt;/div&gt;
    &lt;button class="theme-toggle" id="theme-toggle"&gt;Theme&lt;/button&gt;
&lt;/div&gt;

&lt;!-- Content that WILL be repeated in the loop --&gt;
&lt;div class="page-content"&gt;
    &lt;header&gt;
        &lt;!-- Header content --&gt;
    &lt;/header&gt;
    
    &lt;main&gt;
        &lt;!-- Main content --&gt;
    &lt;/main&gt;
    
    &lt;footer&gt;
        &lt;!-- Footer content --&gt;
    &lt;/footer&gt;
&lt;/div&gt;</code></pre>
    </div>
    <button class="copy-button" data-target="structure">Copy to Clipboard</button>
    
    <h2>With Progress Bar</h2>
    <div class="snippet">
        <pre><code>&lt;!-- Add this HTML --&gt;
&lt;div class="scroll-progress" id="scroll-progress"&gt;&lt;/div&gt;

&lt;!-- Add this CSS --&gt;
&lt;style&gt;
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
&lt;/style&gt;

&lt;!-- Add this JavaScript --&gt;
&lt;script&gt;
// Update progress bar
window.addEventListener('scroll', function() {
    const pageHeight = document.querySelector('.page-content').offsetHeight;
    const scrollPosition = window.scrollY % pageHeight;
    const progress = (scrollPosition / pageHeight) * 100;
    
    document.getElementById('scroll-progress').style.width = progress + '%';
});
&lt;/script&gt;</code></pre>
    </div>
    <button class="copy-button" data-target="progress">Copy to Clipboard</button>
    
    <script>
        // Copy to clipboard functionality
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                const snippetContent = document.querySelector(`[data-target="${target}"]`).previousElementSibling.querySelector('code').textContent;
                
                navigator.clipboard.writeText(snippetContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            });
        });
    </script>
</body>
</html>