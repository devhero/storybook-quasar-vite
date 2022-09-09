# Quasar App (storybook-quasar-vite-typescript)

Skeleton Typescript project based on Quasar v2 (Vue 3), Vite and Storybook



## Install the dependencies
```bash
yarn
```

### Start the app in development/production mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
yarn build
```

### Start storybook in dev/prod
```bash
yarn storybook
yarn build-storybook
```

### Inspect Quasar-vite configuration
```bash
yarn inspect
```

### Lint the files
```bash
yarn lint
```


### Format the files
```bash
yarn format
```


# Curios how this package was made?

Install quasar:
```bash
yarn create quasar
```

Configuration:
```yaml
✔ What would you like to build? › App with Quasar CLI, let's go!
✔ Project folder: {{YOUR_CHOICE}}
✔ Pick Quasar version: › Quasar v2 (Vue 3 | latest and greatest)
✔ Pick script type: › Typescript
✔ Pick Quasar App CLI variant: › Quasar App CLI with Vite
✔ Package name: {{YOUR_CHOICE}}
✔ Project product name: (must start with letter if building mobile apps) {{YOUR_CHOICE}}
✔ Project description: {{YOUR_CHOICE}}
✔ Author: {{YOUR_CHOICE}}
✔ Pick a Vue component style: › Composition API with <script setup>
✔ Pick your CSS preprocessor: › Sass with SCSS syntax
✔ Check the features needed for your project: › ESLint
✔ Pick an ESLint preset: › Prettier
```

Install Storybook:

- https://storybook.js.org/docs/vue/get-started/install

```bash
npx sb init --type vue3
```

In root folder add file _.babelrc_ to enable typescript for storybook:

- https://storybook.js.org/docs/vue/configure/overview#configure-your-project-with-typescript):
```jsonc
// .babelrc

{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript"
  ]
}
```

In folder _.storybook_ substitute _main.js_ and _preview.js_ with following typescript versions:

- https://storybook.js.org/docs/vue/builders/vite#configuration
- https://dev.to/allanjeremy/using-quasar-with-vue3-storybook-4dl8

```typescript
// main.ts

import { InlineConfig, mergeConfig } from 'vite';
import type { StorybookViteConfig } from '@storybook/builder-vite';
import { resolve } from "path";

const projectRootDir = resolve(__dirname);

const config: StorybookViteConfig = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite"
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config, options) {
    const cfg: InlineConfig = {
      resolve: {
        // fundamental to allow Storybook resolves components
        alias: {
          "src": resolve(projectRootDir, "/src"),
          "components": resolve(projectRootDir, "/src/components"),
        }
      },
      build: {
        sourcemap: 'inline'
      },
      server: {

      }
    }
    return mergeConfig(config, cfg)
  }
}

export default config;
```

```typescript
// preview.ts

import 'quasar/dist/quasar.css';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import { app } from '@storybook/vue3';
import { Quasar } from 'quasar';

// This is also where you would setup things such as pinia for storybook

app.use(Quasar, {});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
```

Install Vite and storybook's vite-plugin:

- https://storybook.js.org/docs/vue/builders/vite#setup

```bash
yarn add vite
yarn add -D @storybook/builder-vite
```

# Quasar and Vite

https://quasar.dev/start/vite-plugin#introduction

https://quasar.dev/quasar-cli-vite/

