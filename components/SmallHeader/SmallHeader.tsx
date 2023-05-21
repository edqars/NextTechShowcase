import React from 'react';
import { Button, Typography } from 'antd';

import { useRouter } from 'next/router';

import classNames from 'classnames/bind';
import { signOut } from 'next-auth/react';
import styles from './SmallHeader.module.scss';

const cx = classNames.bind(styles);

function SmallHeader({ title }) {
  const router = useRouter();

  return (
    <div className={cx('small-header')}>
      <Typography className={cx('small-header__title')}>{title}</Typography>

      <div className={cx('small-header__buttons')}>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push('/');
          }}
        >
          Профиль
        </Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push('/photos');
          }}
        >
          Галерея
        </Button>

        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push('/news');
          }}
        >
          Новости
        </Button>

        <Button
          type="primary"
          danger
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          выйти
        </Button>
      </div>
    </div>
  );
}

export default SmallHeader;
