import { type ReactNode } from 'react';
import { Info as InfoIcon, CircleCheck, TriangleAlert, CircleX } from 'lucide-react';
import preview from '../../../.storybook/preview';
import { Alert, AlertIcon, AlertTitle, AlertDescription, type AlertVariant } from './Alert';
import { Flex } from '../Layout';

const icons: Record<AlertVariant, ReactNode> = {
  info: <InfoIcon />,
  success: <CircleCheck />,
  warning: <TriangleAlert />,
  danger: <CircleX />,
};

const VARIANTS: Record<AlertVariant, { title: string; desc: string }> = {
  info: {
    title: 'Heads up',
    desc: 'A new version of the design system is available to try. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed congue sem ac sem suscipit, nec lobortis quam sollicitudin.',
  },
  success: { title: 'Changes saved', desc: 'Your updates have been published to the site.' },
  warning: {
    title: 'Check your settings',
    desc: 'Two fields need attention before you can continue.',
  },
  danger: {
    title: 'Something went wrong',
    desc: "We couldn't save your changes. Please try again.",
  },
};

const meta = preview.meta({
  title: 'Components/Alert',
  component: Alert,
  args: { variant: 'info' },
  argTypes: {
    variant: { control: 'inline-radio', options: Object.keys(VARIANTS) },
  },
});

export const Variants = meta.story({
  render: () => (
    <Flex direction="column" gap="400">
      {Object.entries(VARIANTS).map(([k, v]) => {
        const variant = k as AlertVariant;
        return (
          <Alert key={variant} variant={variant}>
            <AlertIcon>{icons[variant]}</AlertIcon>
            <AlertTitle>{v.title}</AlertTitle>
            <AlertDescription>{v.desc}</AlertDescription>
          </Alert>
        );
      })}
    </Flex>
  ),
});
