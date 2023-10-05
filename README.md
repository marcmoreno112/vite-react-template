# Cómo arrancar el proyecto

1. Settings en VScode:

- En VSCode, en el menú File, ir a Preferences y Settings.
- Ahí, click en el botón "Open Settings (JSON)" en la esquina superior derecha.
- Añadir las siguientes y guardar el archivo:

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

# Flujo de trabajo del equipo

## 1- Ramas

En local, trabajamos en una rama por cada feature, fix, etc. que sale desde la rama principal ("main"). El nombre de la rama debe seguir la siguiente estructura: `<token>/<short-descriptive-name>`.

Los tokens que podemos usar son:

- `chore`: mejoras en temas de administración/mantenimiento del proyecto (i.e. actualización de dependencias).
- `docs`: creación/actualización de documentación (i.e. guía de configuración del proyecto).
- `feature`: nuevas funcionalidades que serán incluidas en el proyecto (i.e. visualización de cursos).
- `fix/hotfix/patch`: corrección de un bug esperado o inesperado (i.e. links rotos).
- `refactor`: mejoras/reescritura de features existentes, no agrega un cambio grande a lo que actualmente tiene (i.e. cambiar estados locales usando stateless components conectados a Redux).
- `test`: agrega tests a un feature existente que no cuenta con los mismos (i.e. unit testing del componente de login).

Para los nombres que siguen al token, buscar palabras cortas que mejor describan en lo que se está trabajando, sin usar espacios ni caracteres especiales. Ejemplo: routing, profile-settings, course-management.

### Ejemplos

- chores/deps-upgrade
- docs/setup
- feature/project-roadmap

## 2- Commits

Trabajamos con commits atómicos según la convención "Conventional commits". El mensaje tiene que tener entre 10 y 72 caracteres, la primera letra en mayúscula y el resto en minúscula.

## 3- Github

Cuando la rama está lista, lanzar git push. Se crea automáticamente una Pull Request en Github y se ejecutan los workflows de Github Actions. No se podrá mergear la rama a main hasta que los checks estén ok. En caso de haber errores, resolverlos en local y hacer push de nuevo con los commits que hayan sido necesarios. Los checks se ejecutarán de nuevo.

Al finalizar el mergeo, eliminar la rama en Github.

En local, situarse en rama main, hacer git pull y borrar la rama auxiliar local que hemos mergeado en Github. Podemos trabajar en ramas en paralelo si fuera necesario para features diferentes, y mergear en local de main a la rama auxiliar si necesitamos código más actualizado.

## 4- SonarCloud

En SonarCloud, se analiza el código para detectar bugs, code smells, vulnerabilidades, puntos críticos de seguridad y código duplicado. También analiza el porcentaje de código testeado, marcando un mínimo del 80% (se puede cambiar).

Entrar en el siguiente enlace para ver los resultados: https://sonarcloud.io/summary/overall?id=marcmoreno112_vite-react-template

## Textos de referencia para la redacción:

https://gist.github.com/ivandevp/41bfb0c77b38d042456dc8fbb4aba885
https://www.conventionalcommits.org/en/v1.0.0/

## Texto sobre buenas prácticas:

https://github.com/ryanmcdermott/clean-code-javascript
