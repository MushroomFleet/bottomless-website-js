# Bottomless.js Repository Structure

```
bottomless/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug-report.md
│   ├── workflows/
│   │   └── build.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── dist/
│   ├── bottomless.js
│   └── bottomless.min.js
├── docs/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── images/
│   │   │   ├── demo.gif
│   │   │   └── logo.png
│   │   └── js/
│   │       └── demo.js
│   └── index.html
├── examples/
│   ├── advanced.html
│   ├── basic.html
│   └── theme-toggle.html
├── snippets/
│   └── installation.html
├── src/
│   └── bottomless.js
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## Directory Explanation

### Root Files
- `README.md` - Project documentation and introduction
- `LICENSE` - MIT license file
- `package.json` - npm package configuration
- `.gitignore` - Git ignore file for node_modules, etc.

### src/ Directory
- Contains the unminified source code

### dist/ Directory
- Contains the distributable files (minified and unminified)

### docs/ Directory
- Public documentation site
- Demo pages

### examples/ Directory
- Example implementations for different use cases

### snippets/ Directory
- Code snippets for quick integration

### .github/ Directory
- GitHub-specific files for issues, PRs, and workflows

## Build Process

The build process uses `terser` for minification:

1. Install dependencies: `npm install`
2. Build: `npm run build`

This will create the minified version in the `dist/` directory from the source file in `src/`.