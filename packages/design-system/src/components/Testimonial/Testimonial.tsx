import { type HTMLAttributes, type ReactNode } from 'react';
import './Testimonial.css';
import './testimonial-words.js';
import { cx } from '../../utils/cx.js';

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'testimonial-words': HTMLAttributes<HTMLElement>;
    }
  }
}

export interface TestimonialProps {
  /** The quote. Wrap the key phrases in `<strong>`; the rest is muted. */
  children: ReactNode;
  name: string;
  role: string;
  /** Shown on its own line under the role. */
  company?: string;
  wide?: boolean;
  className?: string;
}

/** Load `@clara/design-system/testimonial-words.js` on the page for the scroll-in words. */
export const Testimonial = ({
  children,
  name,
  role,
  company,
  wide,
  className,
}: TestimonialProps) => (
  <figure className={cx('testimonial', wide && 'testimonial--wide', className)}>
    <blockquote className="testimonial__quote">
      <p>
        <testimonial-words>
          <span className="testimonial__source">{children}</span>
        </testimonial-words>
      </p>
    </blockquote>
    <figcaption className="testimonial__cite">
      <div className="testimonial__who">
        <span className="testimonial__name">{name}</span>
        <div className="testimonial__role">
          <span>{company ? `${role},` : role}</span> {company && <span>{company}</span>}
        </div>
      </div>
    </figcaption>
  </figure>
);
