# Open Digital Education React Hooks

![npm](https://img.shields.io/npm/v/@ode-react-ui/hooks?style=flat-square)
![bundlephobia](https://img.shields.io/bundlephobia/min/@ode-react-ui/hooks?style=flat-square)

## Getting Started

All shared Hooks between librairies and React Apps.

### Build

```bash
yarn build
```

Use Vite [Library mode](https://vitejs.dev/guide/build.html#library-mode) configuration file from `config` workspace and TypeScript to build the library.

- Will generate a `dist` folder with `index` files (ESM + CJS)
- Will generate `*.d.ts` for every component and index files

### Lint

```bash
yarn lint
```

Use Eslint configuration file from `config` workspace to check all files inside `src` folder.

```bash
yarn fix
```

If `yarn lint` shows issues, run this command to fix them.

### Prettier

```bash
yarn format
```

This command starts `format:check` + `format:write` using Prettier configuration file from `config` workspace.

## Hooks List

[List](LIST.md)
