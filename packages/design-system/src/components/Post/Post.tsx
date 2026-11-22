import { type HTMLAttributes, useId } from 'react';
import './Post.css';
import { cx } from '../../utils/cx.js';
import { Flex } from '../Layout';
import { Text } from '../Text';
import { Link } from '../Link';
import { RuledHeading } from '../RuledHeading';

export type PostListProps = HTMLAttributes<HTMLElement> & {
  /** Heading for the group, e.g. a year or "Recent writing". */
  title?: string;
};

export const PostList = ({ title, className, children, ...props }: PostListProps) => {
  const titleId = useId();
  if (!title) {
    return (
      <div className={cx('post-list', className)} {...props}>
        {children}
      </div>
    );
  }
  return (
    <section className={cx('post-list', className)} aria-labelledby={titleId} {...props}>
      <RuledHeading id={titleId}>{title}</RuledHeading>
      {children}
    </section>
  );
};

export interface PostProps {
  /** Pre-formatted date and reading time, shown below the description. */
  meta: string;
  title: string;
  /** Destination for the title link. */
  href: string;
  description: string;
  className?: string;
}

export const Post = ({ meta, title, href, description, className }: PostProps) => (
  <article className={cx('post', className)}>
    <Flex direction="column" gap="300" className="post__main">
      <Text variant="heading-4" as="h3" className="post__title">
        <Link variant="plain" href={href}>
          {title}
        </Link>
      </Text>
      <p className="post__desc">{description}</p>
      <p className="post__meta">{meta}</p>
    </Flex>
  </article>
);
