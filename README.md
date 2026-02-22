# Cython Enhanced

[Cyright LSP Repository](https://github.com/whoami730/cyright)

Fork of existing Cython VSCode extension, [vscode-cython](https://github.com/ktnrg45/vs-code-cython)

## Cython Language Extension for VS Code

![VS Code Cython Demo](./assets/demo.gif)

# Features

- Syntax highlighting
- Static syntax checking for C and CPP syntax
- Go to definitions
- Import resolver for .pxd files
- Typestub generation (.pyi) for .pyx files (Experimental)

# About

This extension provides syntax highlighting and a Static Syntax checker for the Cython language.
Cython is a superset of Python with it's own C-styled syntax mixed with Python syntax.

The static checker is based on [Pyright](https://github.com/microsoft/pyright) and will only support Cython/Python syntax version 3.0 and above.

This extension uses the configured Python interpreter/venv path from the `VS Code Python` extension.

# Configuration

Configure these in **File → Preferences → Settings** (or your workspace `.vscode/settings.json`):

- **`cython.typeCheckingMode`** — How strict the language server is with diagnostics.  
  - `off` — No type-checking diagnostics.  
  - `cython` **(default)** — Tuned for Cython; reduces false positives from cimports and C types.  
  - `basic` — More checks; good for mixed Python/Cython.  
  - `strict` — Full Pyright-style strict checking.  

- **`cython.includePaths`** — Extra paths (e.g. out-of-tree `.pxd` locations) to use for analysis.

# Commands


## cython.compileCurrentFile

Runs `cythonize` to build current/selected .pyx file inplace.
Useful for smaller files that can be built without setuptools or other build system.

### Availability
- Command Palette
- Explorer context menu

## cython.createTypeStub
*Experimental.*

Create a typestub (.pyi) file for current/selected .pyx file.
These files can be used within Python for static typing.

### Availability
- Command Palette
- Explorer context menu


# Limitations

- Only cimports that are `.pxd` files will be recognized
- The 'Pure Python' syntax is not supported
- Directives will not be considered. This is because directives can be set in multiple places such as in a `setup.py` file and cannot be analyzed statically
- Pyright options are not supported. i.e. `pyrightconfig.json`

# Possible features
These features would be nice to have but are not implemented.

- Strict type analysis
- C headers analysis / inline C code analysis
- Python interaction highlighting

# FAQ

- If no problems are reported will my code compile?

  > No. There are no guarantees that code will be compiled correctly

# Issues

Please report any issues in this repo.

# Installing

## Install with VS Code

Install normally through the extensions tab.

## Install from source

- Clone repo. For installation clone in the `<user home>/.vscode/extensions` folder.

- Ensure submodules are fetched with:

  ```
  git submodule update --init --recursive
  ```

- Install `npm`

### Building source

To build the extension locally:

```bash
npm install --include=dev
npm run build:extension
```

## Building a .vsix package

The project includes `@vscode/vsce` as a dev dependency. From the repo root:

1. **Install dependencies** (if not already done):

   ```bash
   npm install --include=dev
   ```

2. **Build the .vsix** — One command regenerates the grammar, builds the extension, and creates the package:

   ```bash
   npm run vsix
   ```

   This runs (in order) `build:syntax`, `webpack`, and `package`, and produces a file like `cython-enhanced-1.0.6.vsix` in the project root (version from `package.json`).

   To force a specific output filename:

   ```bash
   npm run vsix -- -o cython-enhanced.vsix
   ```

   (Pass the `-o` option through to `vsce package`.) If you already built and only need to repackage, use `npm run package` instead.

3. **Install and test in VS Code**:

   ```bash
   code --install-extension cython-enhanced-1.0.6.vsix
   ```

   (Use the actual filename from step 2.) Then reload the window: **Ctrl+Shift+P** → “Developer: Reload Window” (or restart VS Code). Open a `.pyx` file to verify highlighting and language server.

   **One-shot build + install:**

   ```bash
   npm run package:install
   ```

   This builds the .vsix with `-o cython-enhanced.vsix` and then installs it into VS Code.

4. **Remove the .vsix** (optional):

   ```bash
   npm run package:clean
   ```

# Development

Follow **Install from source** and **Building source** above to get a working build. For day-to-day development:

- **Incremental build:** `npm run build:extension:dev` or, in VS Code, **Tasks: Run Build Task** → **Watch extension** (rebuilds on file changes).

## Debugging

1. In VS Code: **View → Command Palette** → **Tasks: Run Build Task** → **Watch extension** (builds and watches for changes).
2. **Run → Start Debugging** (or F5) and choose the **Extension** launch configuration. This opens a new “Extension Development Host” window with the extension loaded.
3. In that host window, open a `.pyx` file to trigger the language server. To debug the server: from the first window, run the **Attach server** launch configuration.

## Syntax highlighting changes

Edit `./grammars/cython.syntax.yaml`, then regenerate the TextMate grammar:

```bash
npm run build:syntax
```

## Language Server (Cyright) Development

The language server lives in the `cyright` submodule. Pull requests for Cyright should be created under the [Cyright Repository](https://github.com/whoami730/cyright).

Use the **Watch Extension** task and the **Extension** + **Attach Server** launch targets when developing the language server.
