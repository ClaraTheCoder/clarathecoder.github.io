import { type ReactNode } from 'react';
import './Testimonial.css';
import { cx } from '../../utils/cx.js';

const QuoteMark = () => (
  <svg
    role="presentation"
    width="302"
    height="262"
    viewBox="0 0 302 262"
    xmlns="http://www.w3.org/2000/svg"
    className="testimonial__quote-mark"
  >
    <path
      d="M139.212 261.143H0V153.934C0 114.467 8.21433 83.3177 24.643 60.485C41.0717 37.6523 69.234 17.4907 109.13 0L139.212 56.965C114.675 68.4857 97.7133 79.9523 88.328 91.365C78.9427 102.778 73.7157 116.273 72.647 131.851H139.212V261.143ZM301.467 261.143H162.254V153.934C162.254 114.467 170.468 83.3177 186.897 60.485C203.326 37.6523 231.488 17.4907 271.384 0L301.467 56.965C276.93 68.4857 259.968 79.9523 250.582 91.365C241.196 102.778 235.969 116.273 234.9 131.851H301.466L301.467 261.143Z"
    />
  </svg>
);

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
      <QuoteMark />
      <p>{children}</p>
      <QuoteMark />
    </blockquote>
    <figcaption className="testimonial__cite">
      <span className="text-default">{name}</span>
      <span className="testimonial__role">{role}</span>
    </figcaption>
  </figure>
);
