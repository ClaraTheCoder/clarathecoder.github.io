import preview from '../../../.storybook/preview';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

const meta = preview.meta({
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '22rem' }}>
        <Story />
      </div>
    ),
  ],
});

const body = (
  <>
    <CardHeader>
      <CardTitle>Aurora</CardTitle>
      <CardDescription>Real-time telemetry dashboard</CardDescription>
    </CardHeader>
    <CardContent>
      Streaming metrics UI built on web components and a custom token pipeline.
    </CardContent>
    <CardFooter>Updated Oct 2026</CardFooter>
  </>
);

/** Static container (renders a div). No hover or focus ring. */
export const Default = meta.story({
  render: () => <Card>{body}</Card>,
});

/** Whole card is a link — themed hover + focus ring apply. */
export const AsLink = meta.story({
  render: () => (
    <Card as="a" href="#aurora">
      {body}
    </Card>
  ),
});

/** Whole card is a button. */
export const AsButton = meta.story({
  render: () => (
    <Card as="button" type="button">
      {body}
    </Card>
  ),
});
