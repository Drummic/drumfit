# VS Code Extensions Inventory

**Project**: Fitness App (Next.js + Firebase)  
**Last Updated**: January 11, 2026  
**Purpose**: Complete list of VS Code extensions used in development

---

## Table of Contents

1. [Pre-installed Extensions](#pre-installed-extensions)
2. [Essential Extensions](#essential-extensions)
3. [Optional Extensions](#optional-extensions)
4. [Installation Guide](#installation-guide)
5. [Configuration](#configuration)
6. [Troubleshooting](#troubleshooting)

---

## Pre-installed Extensions

These extensions come with VS Code or were already installed:

### AI & Code Assistance

| Extension | ID | Purpose | Status |
|-----------|----|---------| -------|
| GitHub Copilot | `github.copilot` | AI pair programmer for code suggestions | ✅ Installed |
| GitHub Copilot Chat | `github.copilot-chat` | Chat interface for Copilot | ✅ Installed |

### Documentation

| Extension | ID | Purpose | Status |
|-----------|----|---------| -------|
| Markdown All in One | `yzhang.markdown-all-in-one` | Markdown editing, preview, TOC generation | ✅ Installed |

---

## Essential Extensions

Must-have extensions for this project. Install if not already present.

### Code Quality & Linting

| Extension | ID | Purpose | Status |
|-----------|----|---------| ---------|
| ESLint | `dbaeumer.vscode-eslint` | Find and fix JavaScript/TypeScript issues | ✅ Installed |
| **Type**: Essential | | Enforces consistent code style across team | - |

**Key Features:**
- Real-time linting as you type
- Auto-fixes with `--fix` on save (with proper config)
- Integration with .eslintrc.json
- Supports JSX/TSX

**Config File**: `.eslintrc.json`

---

### Code Formatting

| Extension | ID | Purpose | Status |
|-----------|----|---------| ---------|
| Prettier | `esbenp.prettier-vscode` | Automatic code formatter | ✅ Installed |
| **Type**: Essential | | Formats JS, TS, JSX, TSX, JSON, CSS, YAML | - |

**Key Features:**
- Format on save (with proper config)
- Consistent code style across all files
- Works with ESLint
- Respects .prettierrc configuration

**Config File**: `.prettierrc`

---

### Styling & CSS

| Extension | ID | Purpose | Status |
|-----------|----|---------| ---------|
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Tailwind CSS class suggestions & preview | ✅ Installed |
| Headwind | `heybourn.headwind` | Automatic Tailwind class sorting | ✅ Installed |
| Tailwind Docs | `austenc.tailwind-docs` | Quick access to Tailwind documentation | ✅ Installed |

**Tailwind CSS IntelliSense Features:**
- Autocomplete for Tailwind classes
- Color preview in editor
- Syntax highlighting
- Class validation

**Headwind Features:**
- Automatically sorts classes following Tailwind's recommended order
- Format on save with keybinding `Alt+Shift+T`

---

### Firebase & Database

| Extension | ID | Purpose | Status |
|-----------|----|---------| ---------|
| Firestore Explorer | `alesdi.firestore-explorer` | Visual Firestore database explorer | ✅ Installed |
| Firestore Studio | `codeomnitrix.firestore-studio` | Advanced Firestore database UI | ✅ Installed |
| Firebase Configuration Schema | `damphat.firebase-json` | JSON schema for firebase.json files | ✅ Installed |

**Firestore Explorer Features:**
- Browse collections and documents
- View real-time data
- Test queries
- Edit documents in VS Code

**Firestore Studio Features:**
- Full Firestore database interface
- Advanced query builder
- Data visualization

---

## Optional Extensions

Useful but not required for core development:

### API Testing

| Extension | ID | Purpose | Status |
|-----------|----|---------| ---------|
| HTTP Client | `mkloubert.vscode-http-client` | Send HTTP requests directly from VS Code | ✅ Installed |

**Features:**
- Replace for Postman/Insomnia
- Test API endpoints
- Save request history
- Environment variables support

**Usage**: Create `.http` or `.rest` files in your project

---

### Version Control

| Extension | ID | Purpose | Status |
|-----------|----|---------| ---------|
| GitLens | `eamodio.gitlens` | Git information and history in editor | ✅ Installed |

**Features:**
- Blame information inline
- Commit history
- Branch comparison
- Repository insights

---

### TypeScript

| Extension | ID | Purpose | Install Command |
|-----------|----|---------| ---------|
| TypeScript Vue Plugin | `Vue.vscode-typescript-vue-plugin` | TypeScript support for Vue (optional) | `code --install-extension Vue.vscode-typescript-vue-plugin` |

---

## Installation Guide

✅ **All recommended extensions are now installed!**

### If you need to reinstall:

**Via Command Line**:
```bash
code --install-extension dbaeumer.vscode-eslint esbenp.prettier-vscode bradlc.vscode-tailwindcss heybourn.headwind austenc.tailwind-docs alesdi.firestore-explorer codeomnitrix.firestore-studio damphat.firebase-json mkloubert.vscode-http-client eamodio.gitlens
```

**Via VS Code UI**:
1. Open Extensions (Ctrl+Shift+X / Cmd+Shift+X)
2. Search for extension name
3. Click Install

**Via Extensions JSON**:
Create `.vscode/extensions.json` in project root:
```json
{
  "recommendations": [
    "github.copilot",
    "github.copilot-chat",
    "yzhang.markdown-all-in-one",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "heybourn.headwind",
    "austenc.tailwind-docs",
    "alesdi.firestore-explorer",
    "codeomnitrix.firestore-studio",
    "damphat.firebase-json",
    "mkloubert.vscode-http-client",
    "eamodio.gitlens"
  ]
}
```

---

## Configuration

### ESLint Configuration

Create `.eslintrc.json` in project root:

```json
{
  "extends": [
    "next/core-web-vitals"
  ],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "react/react-in-jsx-scope": "off"
  }
}
```

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

### Prettier Configuration

Create `.prettierrc` in project root:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

### Tailwind CSS Configuration

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "tailwindCSS.emmetCompletions": true,
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],
  "[css]": {
    "editor.formatOnSave": false
  }
}
```

---

### Firestore Extensions Configuration

**For Firestore Explorer:**
1. Open Command Palette (Ctrl+Shift+P)
2. Search "Firebase: Setup"
3. Select your Firebase project

**For Firestore Studio:**
1. Right-click on project in Explorer
2. Select "Open Firestore Studio"

---

## Recommended VS Code Settings

Create or update `.vscode/settings.json`:

```json
{
  // Editor
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.wordWrap": "on",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.trimAutoWhitespace": true,

  // Formatting
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },

  // Files
  "files.exclude": {
    "**/.DS_Store": true,
    "**/.git": true,
    "**/node_modules": true
  },
  "files.trimTrailingWhitespace": true,
  "files.trimFinalNewlines": true,

  // Search
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    "**/dist": true
  },

  // Tailwind
  "tailwindCSS.emmetCompletions": true,

  // TypeScript
  "typescript.preferences.importModuleSpecifierFormat": "es6-imports",

  // ESLint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

---

## Extension Shortcuts & Commands

### ESLint
- **Command Palette**: `ESLint: Fix all auto-fixable issues`
- **Keyboard**: Varies by config

### Prettier
- **Format Document**: `Shift+Alt+F`
- **Format Selection**: `Ctrl+K Ctrl+F`

### Headwind (Tailwind Sorting)
- **Sort Tailwind Classes**: `Alt+Shift+T`
- **Format Document**: `Shift+Alt+F` (if configured)

### Tailwind Docs
- **Open Docs**: Command Palette → "Tailwind: Open Documentation"
- **Quick Preview**: Hover over class name

### Firestore Explorer
- **Open Explorer**: View → Explorer → Firestore
- **Refresh**: Right-click collection

### HTTP Client
- **Send Request**: `Ctrl+Alt+R` (in .http file)
- **Show Request History**: `Ctrl+Alt+H`

### GitLens
- **Open GitLens**: `Ctrl+Shift+G`
- **Toggle File Blame**: `Alt+B`
- **Show Commits**: Right-click line → GitLens

---

## Troubleshooting

### ESLint Not Working

**Problem**: ESLint shows no errors/warnings

**Solution**:
1. Ensure `.eslintrc.json` exists in root
2. Restart VS Code (Cmd+K → Cmd+Q)
3. Check extension status: Command Palette → "ESLint: Show Output"
4. Install `npm install eslint --save-dev`

---

### Prettier Not Formatting

**Problem**: Prettier doesn't auto-format on save

**Solution**:
1. Ensure `.prettierrc` exists
2. Check default formatter: Settings → "Default Formatter" → Prettier
3. Enable "Format on Save": Settings → Enable toggle
4. Restart VS Code

---

### Tailwind Classes Not Showing

**Problem**: Tailwind autocomplete not working

**Solution**:
1. Create `tailwind.config.js` in root
2. Ensure `content` paths are correct
3. Extension needs to scan files: Check if paths match your setup
4. Restart VS Code

---

### Firestore Extensions Can't Connect

**Problem**: Can't connect to Firebase project

**Solution**:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Select project: `firebase use --add`
4. Ensure `.firebaserc` exists in root
5. Restart VS Code extension

---

### Conflicting Formatters

**Problem**: Prettier and ESLint formatting conflicts

**Solution**:
1. Install: `npm install --save-dev eslint-config-prettier`
2. Update `.eslintrc.json`:
   ```json
   {
     "extends": ["next/core-web-vitals", "prettier"]
   }
   ```
3. This disables ESLint formatting, leaving only Prettier

---

## Performance Tips

1. **Disable extensions you don't use**: Extensions icon → Disable/Uninstall
2. **Firestore extensions are heavy**: Consider disabling if not needed
3. **ESLint can slow large projects**: Use `.eslintignore` to exclude folders
4. **Reload window**: Cmd+K Cmd+R after major changes

---

## Update Schedule

- **Check for updates**: VS Code → Help → Check for Extensions Updates
- **Keep extensions updated**: Monthly recommended
- **Test updates**: Update one extension, test before updating all

---

## Dependencies in package.json

These should match with extensions' support:

```json
{
  "devDependencies": {
    "eslint": "^8.50.0",
    "eslint-config-next": "^14.0.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.3.0",
    "firebase-tools": "^12.0.0"
  }
}
```

---

## Summary Table

| Category | Extensions | Count | Status |
|----------|------------|-------|----------|
| Pre-installed | Copilot, Copilot Chat, Markdown All in One | 3 | ✅ Installed |
| Code Quality | ESLint, Prettier | 2 | ✅ Installed |
| Styling | Tailwind CSS, Headwind, Tailwind Docs | 3 | ✅ Installed |
| Firebase | Firestore Explorer, Firestore Studio, Firebase Config | 3 | ✅ Installed |
| Optional | HTTP Client, GitLens | 2 | ✅ Installed |
| **Total** | | **13** | ✅ Complete |

---

## Notes

- All extensions are free and open-source (except Copilot which is paid)
- Extensions can be disabled per workspace
- Some extensions auto-update; some require manual updates
- Firestore extensions require active Firebase project
- HTTP Client is only needed for API testing (Postman alternative)

---

## Related Documentation

- [Architecture Document](./ARCHITECTURE/ARCHITECTURE.md)
- [Setup Guide](./SETUP_GUIDE.md) (to be created)
- [VS Code Settings Template](.vscode/settings.json)
- [ESLint Config](.eslintrc.json)
- [Prettier Config](.prettierrc)
