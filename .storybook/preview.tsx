import type { Preview } from "@storybook/react";

import { ThemeProvider } from "../src/components/Theme";

import "../src/app/global.css";

export const globalTypes = {
  themeMode: {
    name: "Theme",
    description: "Toggle light and dark mode",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", title: "Light" },
        { value: "dark", title: "Dark" },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => (
      <ThemeProvider theme={context.globals.themeMode}>
        <div
          style={{
            minHeight: "100vh",
            width: "100%",
            padding: "1rem",
            backgroundColor: "var(--ui-Canvas)",
            color: "var(--ui-TextPrimary)",
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
