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
