
## Project structure (important files)
- src/
  - components/
    - process-bar/
      - process-bar.tsx — visual ProcessBar component (responsive, compact/full)
      - context.tsx — ProcessBarProvider that syncs activeStep with current pathname
      - index.ts — re-exports for convenience
    - iconify/ — icon wrapper used across the project
    - logo/ — small logo component
  - layouts/
    - auth/ — authentication layout that places ProcessBar in the header center area
  - pages/ or sections/
    - auth/
      - register-view.tsx — registration form (first step)
      - personal, shipping, confirmation — other registration steps (route-based)
  - routes/ — routing hooks and RouterLink helpers
  - styles / theme — app theme and CSS variable definitions




## License

Distributed under the [MIT](https://github.com/minimal-ui-kit/minimal.free/blob/main/LICENSE.md) license.

