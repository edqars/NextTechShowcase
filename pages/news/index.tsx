import React from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames/bind';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import SmallHeader from '../../components/SmallHeader/SmallHeader';
import styles from '../../styles/News.module.scss';
import { fetchPosts } from '../../api/news';

const cx = classNames.bind(styles);

function News() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['posts'],
    fetchPosts,
    {
      getNextPageParam: (lastPage) => {
        const lastPostId = lastPage[lastPage.length - 1]?.id;
        return lastPostId ? Math.floor(lastPostId / 10) + 1 : undefined;
      },
    }
  );

  return (
    <main className={cx('news-page')}>
      <SmallHeader title="The news" />

      <div className={cx('news-page__content')} />
      <div>
        <InfiniteScroll
          className={cx('news-page__list')}
          dataLength={data?.pages.flatMap((page) => page).length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<>Loading</>}
          endMessage={<h4>No mo posts to load</h4>}
        >
          {data?.pages.flatMap((page) =>
            page.map((post) => (
              <Link href={`/news/${post.id}`} key={post.id}>
                <div className={cx('news-page__item')}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                  <p>{post.id}</p>
                </div>
              </Link>
            ))
          )}
        </InfiniteScroll>
      </div>
    </main>
  );
}

export default News;
