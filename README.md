# Starting the app

1. Añadir las siguientes reglas a la configuración de Visual Studio Code:

   {
   "editor.codeActionsOnSave": {
   "source.fixAll.eslint": true
   },
   "editor.defaultFormatter": "esbenp.prettier-vscode",
   "[html]": {
   "editor.linkedEditing": true,
   "editor.defaultFormatter": "vscode.html-language-features"
   },
   "files.autoSave": "off",
   "files.insertFinalNewline": true,
   "editor.formatOnPaste": true,
   "editor.formatOnSave": true,
   "editor.tabSize": 2,
   "javascript.updateImportsOnFileMove.enabled": "always",
   "typescript.updateImportsOnFileMove.enabled": "always"
   }

2. Instalar las siguientes extensiones de VSCode:

- "Prettier - Code formatter" de "Prettier"
- "ESLint" de Microsoft

3. En el terminal, lanzar `npm install`.

4. En el terminal, lanzar `npm run dev` para levantar la aplicación.

<br>
