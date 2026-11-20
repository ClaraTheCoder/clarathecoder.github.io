import preview from '../../../.storybook/preview';
import { Notice } from './Notice';

const meta = preview.meta({
  title: 'Components/Notice',
  component: Notice,
  args: { href: '#contact', children: 'Available for work from January 2027' },
  parameters: { fullWidth: true },
});

export const Default = meta.story({});
