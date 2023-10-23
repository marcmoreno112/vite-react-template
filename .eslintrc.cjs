module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["/*.js", "/*.cjs"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react-hooks", "hexagonal-architecture"],

  overrides: [
    {
      files: ["src/**/*.ts"],
      rules: {
        "hexagonal-architecture/enforce": ["error"],
      },
    },
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "no-console": "off",
  },
};
