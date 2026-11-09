import React from 'react';
import { definePreview, type Decorator } from '@storybook/react-vite';
import addonA11y from '@storybook/addon-a11y';
import addonDocs from '@storybook/addon-docs';
import '@clara/tokens/tokens.css';
import '../src/styles/index.css';
import '../src/styles/swirl.css';
import '../src/styles/grid-backdrop.css';

const presets = [
  { value: 'default', title: 'Default' },
  { value: 'opal', title: 'Opal' },
  { value: 'blueprint', title: 'Blueprint' },
];

const withTheme: Decorator = (Story, context) => {
  const preset = context.globals.preset ?? 'default';
  const mode = context.globals.mode ?? 'light';
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    // 'default' is the base theme — no [data-preset] layer.
    if (preset === 'default') root.removeAttribute('data-preset');
    else root.setAttribute('data-preset', preset);
  }
  // Per-theme stage backdrops are the same layers the site uses: the animated
  // `.swirl` orbs (opal, swirl.css) and the `.grid-backdrop` grid
  // (grid-backdrop.css, blueprint). Each shows only under its own [data-preset].
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 28,
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <div className="grid-backdrop" aria-hidden="true" />
      {preset === 'opal' && (
        <div className="swirl" aria-hidden="true">
          <div className="swirl__rotor">
            <div className="swirl__aurora" />
          </div>
        </div>
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Story />
      </div>
    </div>
  );
};

export default definePreview({
  addons: [addonA11y(), addonDocs()],
  globalTypes: {
    preset: {
      description: 'Theme preset',
      defaultValue: 'default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: presets,
      },
    },
    mode: {
      description: 'Light or dark',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
      },
    },
  },
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: {
      storySort: { order: ['Foundations', 'Components', '*'] },
    },
  },
});
