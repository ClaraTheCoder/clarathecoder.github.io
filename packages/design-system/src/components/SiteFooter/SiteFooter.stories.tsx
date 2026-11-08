import preview from '../../../.storybook/preview';
import { SiteFooter } from './SiteFooter';
import { Link } from '../Link';

const meta = preview.meta({
  title: 'Components/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({
  render: () => (
    <SiteFooter>
      Find me elsewhere on <Link href="#">LinkedIn</Link> and <Link href="#">GitHub</Link>.
    </SiteFooter>
  ),
});
