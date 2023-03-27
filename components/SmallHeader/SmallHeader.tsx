import React from 'react';
import {Button, Typography} from "antd";

import {useRouter} from "next/router";
import cookie from "js-cookie";

import styles from './SmallHeader.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)


const SmallHeader = ({title}) => {

    const router = useRouter();

    return (
        <div className={cx('small-header')}>
            <Typography className={cx('small-header__title')}>
                {title}
            </Typography>

            <div className={cx('small-header__buttons')}>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        router.push('/profile')
                    }}>
                    Профиль
                </Button>

                <Button onClick={(e) => {
                    e.preventDefault()
                    router.push('/photos/')
                }}>
                    Галерея
                </Button>

                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        router.push('/news')
                    }}>
                    Новости
                </Button>

                <Button
                    type="primary"
                    danger
                    onClick={(e) => {
                        e.preventDefault()
                        cookie.remove('token');
                        router.push('/login')
                    }}>
                    выйти
                </Button>
            </div>
        </div>
    );
};

export default SmallHeader;
