import { useState } from "react";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";

import { ThemeProvider, useTheme } from "./ThemeProvider";
import type { Theme } from "./ThemeProvider.types";

const meta: Meta<typeof ThemeProvider> = {
  title: "Components/Theme Visualizer",
  component: ThemeProvider,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof ThemeProvider>;

const THEME_VARIABLES = [
  { name: "Background", variable: "--background" },
  { name: "Foreground", variable: "--foreground" },
  { name: "Foreground Subtle", variable: "--foreground-subtle" },
  { name: "Meta Text", variable: "--meta-text" },
  { name: "Primary Accent", variable: "--primary-accent" },
];

const ColorSwatch = ({
  name,
  variable,
}: {
  name: string;
  variable: string;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        backgroundColor: `var(${variable})`,
        borderRadius: "8px",
        border: "1px solid var(--button-secondary-border)",
      }}
    />
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          margin: 0,
          fontWeight: 500,
          fontSize: "14px",
          color: "var(--foreground)",
        }}
      >
        {name}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: "12px",
          color: "var(--meta-text)",
          fontFamily: "monospace",
        }}
      >
        {variable}
      </p>
    </div>
  </div>
);

const ThemeVisualizer = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "var(--background)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ margin: 0, color: "var(--foreground)" }}>Theme Colors</h1>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            border: "1px solid var(--button-secondary-border)",
            background: "var(--button-secondary-bg)",
            color: "var(--button-secondary-fg)",
            borderRadius: "99px",
            cursor: "pointer",
          }}
        >
          {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          <span style={{ fontWeight: 500 }}>
            {theme === "light" ? "Dark" : "Light"} Mode
          </span>
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "24px",
        }}
      >
        {THEME_VARIABLES.map((item) => (
          <ColorSwatch
            key={item.variable}
            name={item.name}
            variable={item.variable}
          />
        ))}
      </div>
    </div>
  );
};

// --- Story Definition ---

export const Default: Story = {
  // We manage the state locally for the story's render function.
  render: function Render() {
    const [theme, setTheme] = useState<Theme>("light");

    return (
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <ThemeVisualizer />
      </ThemeProvider>
    );
  },
};
