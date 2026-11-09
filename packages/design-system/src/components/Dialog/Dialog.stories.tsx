import { useState } from 'react';
import preview from '../../../.storybook/preview';
import { Button } from '../Button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from './Dialog';

const meta = preview.meta({
  title: 'Components/Dialog',
  component: Dialog,
});

export const Default = meta.story({
  render: () => (
    <Dialog>
      <DialogTrigger>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  ),
});

export const Controlled = meta.story({
  render: function Render() {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger variant="fixed">Open ({open ? 'open' : 'closed'})</DialogTrigger>
        <DialogContent>
          <DialogTitle>Controlled dialog</DialogTitle>
          <DialogDescription>Open state lives in the story.</DialogDescription>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogContent>
      </Dialog>
    );
  },
});

export const LongContent = meta.story({
  render: () => (
    <Dialog>
      <DialogTrigger>Open long dialog</DialogTrigger>
      <DialogContent>
        <DialogTitle>Long content</DialogTitle>
        <DialogDescription>Scrolls within the dialog.</DialogDescription>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraph {i + 1}.
          </p>
        ))}
        <Button variant="fixed">A focusable button at the end</Button>
      </DialogContent>
    </Dialog>
  ),
});
