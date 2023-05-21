import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import classnames from 'classnames/bind';
import { useInfiniteQuery } from '@tanstack/react-query';
import SmallHeader from '../components/SmallHeader/SmallHeader';
import styles from '../styles/Gallery.module.scss';
import { fetchPhotos } from '../api/photos';

const cx = classnames.bind(styles);

function Photos() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['photos'],
    fetchPhotos,
    {
      getNextPageParam: (lastPage) => {
        const lastPhotoId = lastPage.data[lastPage.data.length - 1]?.id;
        return lastPhotoId ? lastPage.nextPage : undefined;
      },
    }
  );

  return (
    <main className={cx('gallery-page')}>
      <SmallHeader title="Страница с фотографиями" />

      <InfiniteScroll
        dataLength={data?.pages.flatMap((page) => page.data).length ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more photos to load.</p>}
      >
        {data?.pages.flatMap((page) =>
          page.data.map((photo) => (
            <div key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <h2>{photo.title}</h2>
              <h2>{photo.id}</h2>
            </div>
          ))
        )}
      </InfiniteScroll>
    </main>
  );
}

export default Photos;
