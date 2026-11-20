import preview from '../../../.storybook/preview';
import { SiteHeader } from './SiteHeader';

const meta = preview.meta({
  title: 'Components/SiteHeader',
  component: SiteHeader,
  args: {
    brand: { label: 'Clara', href: '/' },
    nav: [
      { label: 'Writing', href: '/writing' },
      { label: 'Work', href: '/work' },
    ],
    current: '/writing',
  },
  parameters: { fullWidth: true },
});

export const Default = meta.story({});
