module.exports = {
  stories: [
    "../../../libs/core/src/**/*.stories.mdx",
    "../../../libs/core/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../libs/advanced/src/**/*.stories.mdx",
    "../../../libs/advanced/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-cssresources",
  ],
  typescript: {
    reactDocgen: "react-docgen",
  },
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  features: {
    storyStoreV7: true,
  },
};