# Nano JSX (Isomorphic and ESM-only)

Isomorphic Nano JSX example using Webpack, TypeScript and ESModules.

```bash
npm run build

npm run serve
```

## Comments

- `--experimental-specifier-resolution=node` is needed, otherwise Node.js can't resolve `"jsxImportSource": "nano-jsx/esm"`.
- `resolve-typescript-plugin` is needed, otherwise Webpack can't resolve `.js` files inside a `.ts` file.
