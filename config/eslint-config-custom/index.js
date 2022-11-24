module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "airbnb",
    "airbnb-typescript",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./config/ts/tsconfig.json",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "arrow-parens": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": ["off"],
    "react/no-unescaped-entities": ["off"],
    "react/jsx-one-expression-per-line": "off",
    "react/require-default-props": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/function-component-definition": ["off"],
    "prefer-object-spread": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
      },
    ],
    "@typescript-eslint/quotes": "off",
    "no-console": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
  ignorePatterns: [
    "prettier.config.js",
    "node_modules",
    "public",
    "dist",
    "storybook-static",
    "vite.config.ts",
    "*.stories.tsx",
    "tsconfig.json",
    ".eslintrc",
    ".eslintrc.cjs",
    "svgr.config.cjs",
    "apps.d.ts",
  ],
};
