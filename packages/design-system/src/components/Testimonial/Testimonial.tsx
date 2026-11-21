import { type ReactNode } from 'react';
import './Testimonial.css';
import { cx } from '../../utils/cx.js';

export interface TestimonialProps {
  /** The quote. Wrap the key phrases in `<strong>`; the rest is muted. */
  children: ReactNode;
  name: string;
  role: string;
  /** Shown on its own line under the role. */
  company?: string;
  className?: string;
}

export const Testimonial = ({ children, name, role, company, className }: TestimonialProps) => (
  <figure className={cx('testimonial', className)}>
    <blockquote className="testimonial__quote">
      <span className="testimonial__mark testimonial__mark--open" aria-hidden="true">
        “
      </span>
      <p>{children}</p>
    </blockquote>
    <figcaption className="testimonial__cite">
      <span className="testimonial__who">
        <span className="testimonial__name">{name}</span>
        <span className="testimonial__role">
          <span>{company ? `${role},` : role}</span> {company && <span>{company}</span>}
        </span>
      </span>
      <span className="testimonial__mark testimonial__mark--close" aria-hidden="true">
        ”
      </span>
    </figcaption>
  </figure>
);
