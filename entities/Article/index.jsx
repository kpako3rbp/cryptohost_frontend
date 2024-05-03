import cl from 'classnames';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import Content from '@/shared/ui/Content';
import PixelizedImg from '@/shared/ui/PixelizedImg';
import Title from '@/shared/ui/Title';
import { setCategories } from '@/slices/postsSlice';

import styles from './index.module.scss';
import {formatDateTime} from "@/shared/lib/formatDateTime";
import {baseUrl} from "@/routes";

const Article = (props) => {
  const { children, className, post, directory } = props;
  const date = formatDateTime(post.published_at);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>{post.meta_title}</title>
        <meta name="description" content={`${post.description}`} />
        <meta name="image" content={`${baseUrl}/${post.image}`} />
      </Head>

      <article className={cl(className, styles.article)}>
        <Title className={styles.articleTitle}>{post.title}</Title>
        <div className={styles.articleInfo}>
          {post.category && (
            <>
              <Link
                className={styles.articleCategory}
                href={`/news?category=${post.category.id}`}
                onClick={() => dispatch(setCategories(post.category.id))}
              >
                {post.category.name}
              </Link>
              {' / '}
            </>
          )}
          {date}
        </div>
        <Link href={`${directory}/${post.slug}`}>
          <PixelizedImg
            className={styles.articleImg}
            src={`${baseUrl}/${post.image}`}
            alt={''}
            pixelScale={20}
          ></PixelizedImg>
        </Link>
        <Content body={post.body} className={styles.articleContent} />
      </article>
    </>
  );
};

export default Article;
