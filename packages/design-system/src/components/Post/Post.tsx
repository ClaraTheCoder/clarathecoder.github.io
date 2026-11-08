import { type HTMLAttributes } from 'react';
import './Post.css';
import { cx } from '../../utils/cx.js';
import { Flex } from '../Layout/index.js';
import { Text } from '../Text/index.js';

export type PostListProps = HTMLAttributes<HTMLDivElement>;

export const PostList = ({ className, children, ...props }: PostListProps) => (
  <div className={cx('post-list', className)} {...props}>
    {children}
  </div>
);

export interface PostProps {
  /** Pre-formatted date / eyebrow line. */
  meta: string;
  title: string;
  /** Destination for the title link. */
  href: string;
  description: string;
  className?: string;
}

export const Post = ({ meta, title, href, description, className }: PostProps) => (
  <article className={cx('post', className)}>
    <p className="post__meta">{meta}</p>
    <Flex direction="column" gap="200">
      <Text variant="heading-4" as="h3" className="post__title">
        <a href={href}>{title}</a>
      </Text>
      <p className="post__desc">{description}</p>
    </Flex>
  </article>
);
