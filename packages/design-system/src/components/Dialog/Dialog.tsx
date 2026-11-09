import {
  createContext,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  type RefObject,
  useState,
} from 'react';
import { cx } from '../../utils/cx.js';
import { type Polymorphic } from '../../utils/polymorphic.js';
import { Button, type ButtonProps } from '../Button/index.js';
import './Dialog.css';

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: RefObject<HTMLElement | null>;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialog = (part: string) => {
  const context = useContext(DialogContext);
  if (!context) throw new Error(`<${part}> must be used inside <Dialog>.`);
  return context;
};

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open: openProp, defaultOpen = false, onOpenChange, children }: DialogProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;
  const titleId = useId();
  const descriptionId = useId();
  const triggerRef = useRef<HTMLElement | null>(null);

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen, triggerRef, titleId, descriptionId }}>
      {children}
    </DialogContext.Provider>
  );
};

export type DialogTriggerProps = ButtonProps<'button'>;

export const DialogTrigger = ({ onClick, ...props }: DialogTriggerProps) => {
  const { setOpen, triggerRef } = useDialog('DialogTrigger');
  return (
    <Button
      aria-haspopup="dialog"
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        triggerRef.current = event.currentTarget;
        if (!event.defaultPrevented) setOpen(true);
      }}
      {...props}
    />
  );
};

export type DialogContentProps = HTMLAttributes<HTMLDivElement>;

export const DialogContent = ({ className, children, ...props }: DialogContentProps) => {
  const { open, setOpen, triggerRef, titleId, descriptionId } = useDialog('DialogContent');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocusRef.current = triggerRef.current ?? (document.activeElement as HTMLElement | null);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, triggerRef]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClick = (event: globalThis.MouseEvent) => {
      if (event.target === dialog) setOpen(false);
    };
    dialog.addEventListener('click', handleClick);
    return () => dialog.removeEventListener('click', handleClick);
  }, [setOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      closedby="any"
      onClose={() => {
        setOpen(false);
        returnFocusRef.current?.focus();
      }}
    >
      <div className={cx('dialog__content', className)} {...props}>
        {children}
      </div>
    </dialog>
  );
};

export type DialogTitleProps<E extends ElementType = 'h2'> = Polymorphic<E>;

export const DialogTitle = <E extends ElementType = 'h2'>({ as, className, ...props }: DialogTitleProps<E>) => {
  const { titleId } = useDialog('DialogTitle');
  const Component = (as ?? 'h2') as ElementType;
  return <Component id={titleId} className={cx('dialog__title', 'text-heading-4', className)} {...props} />;
};

export type DialogDescriptionProps<E extends ElementType = 'p'> = Polymorphic<E>;

export const DialogDescription = <E extends ElementType = 'p'>({
  as,
  className,
  ...props
}: DialogDescriptionProps<E>) => {
  const { descriptionId } = useDialog('DialogDescription');
  const Component = (as ?? 'p') as ElementType;
  return (
    <Component
      id={descriptionId}
      className={cx('dialog__description', 'text-body', 'text-muted', className)}
      {...props}
    />
  );
};
