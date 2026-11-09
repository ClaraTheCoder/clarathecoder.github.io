import { type ReactNode } from 'react';
import './Testimonial.css';
import { cx } from '../../utils/cx.js';

export interface TestimonialProps {
  /** The pull-quote text. */
  children: ReactNode;
  /** Attributed name. */
  name: string;
  /** Attributed role / company. */
  role: string;
  className?: string;
}

export const Testimonial = ({ children, name, role, className }: TestimonialProps) => (
  <figure className={cx('testimonial', className)}>
    <blockquote className="testimonial__quote">
      <span className="testimonial__quote-mark" aria-hidden="true">
        “
      </span>
      <p>{children}</p>
      <span className="testimonial__quote-mark" aria-hidden="true">
        ”
      </span>
    </blockquote>
    <figcaption className="testimonial__cite">
      <span className="text-default">{name}</span>
      <span className="testimonial__role">{role}</span>
    </figcaption>
  </figure>
);
