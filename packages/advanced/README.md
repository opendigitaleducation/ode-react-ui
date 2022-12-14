# Open Digital Education React Advanced Components

![npm](https://img.shields.io/npm/v/@ode-react-ui/advanced?style=flat-square)
![bundlephobia](https://img.shields.io/bundlephobia/min/@ode-react-ui/advanced?style=flat-square)

## Getting Started

### Build

```bash
yarn build
```

Use Vite [Library mode](https://vitejs.dev/guide/build.html#library-mode).

- Will generate a `dist` folder with `index` files (ESM + CJS)
- Will generate `*.d.ts` for every component and index files

### Lint

```bash
yarn lint
```

```bash
yarn fix
```

If `yarn lint` shows issues, run this command to fix them.

### Prettier

```bash
yarn format
```

This command starts `format:check` + `format:write`

## Structure

### Component Folder

- Folder name always in PascalCase: `TreeView`
- Component file in PascalCase: `TreeView.tsx`
- Component types & interface: `TreeViewProps.tsx`
- Stories file in PascalCase + `*.stories.tsx` : `TreeView.stories.tsx`

```bash
src
  -- ComponentFolder
    -- Component.tsx
    -- Component.stories.tsx
    -- ComponentProps.tsx
    -- index.tsx
```

- Import the Component inside his own `index` file: `index.tsx`

```jsx
export { default as Component } from "./Component";
```

### Component Guideline

Always add JSDoc syntax to Component file linking to :

- Storybook Doc
- Github Source file
- WAI-ARIA Component page if exists

```jsx
/**
 * TreeView Component
 *
 * @see Docs     Storybook Link
 * @see Source   https://github.com/opendigitaleducation/ode-react-ui/blob/master/packages/core/src/TreeView/TreeView.tsx
 * @see WAI-ARIA https://www.w3.org/WAI/ARIA/apg/patterns/treeview/
 */
```

### Component Syntax

#### Component description

- Always document basic guideline of Component. Used by Storybook to generate documentation.

```jsx
/**
 * TreeView component for file system navigation
 */
```

#### Interface description

- Always document typescript types and interface with JSDoc syntax. Used by Storybook to generate documentation.

```jsx
// Interface description (e.g: TreeViewProps.tsx)
export interface RenderTree {
  /**
   * @param id : node's id
   */
  id: string;
  /**
   * @param name : name's id
   */
  name: string;
  /**
   * Is this node contains children ?
   */
  children?: readonly RenderTree[];
}
```

### Index file inside `src` folder

- Entry point of this React Library.
- Import your component inside `index.tsx` file.

```jsx
// Components
export { Button } from "./Button";
```

## Dev

You can build your component using `Storybook`. See [README](../../apps/docs/README.md)

## Components Roadmap

[Roadmap](ROADMAP.md)
