import React from 'react';
import classNames from 'classnames/bind';
import { usePost } from '../../hooks/api/post';
import Loader from '../../components/Loader/Loader';
import SmallHeader from '../../components/SmallHeader/SmallHeader';
import styles from '../../styles/News.module.scss';

const cx = classNames.bind(styles);

function Post({ id }) {
  const { data, isLoading } = usePost(id);

  if (isLoading) return <Loader />;

  return (
    <main className={cx('news-page')}>
      <SmallHeader title={`The post with id ${data.id}`} />

      <div className={cx('news-page__item')}>
        <h2>{data.title}</h2>
        <p>{data.body}</p>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params?.id as string;

  return {
    props: {
      id,
    },
  };
}

export default Post;
