import React, { useState } from 'react';
import cookie from 'js-cookie';
import axios from "axios";
import Router from 'next/router'

import { parse } from 'cookie';
import {Field, Form, Formik} from "formik";
import {Button, Input, notification, Typography} from "antd";
import Loader from "@component/components/Loader/Loader";


import classNames from 'classnames/bind'
import styles from '@component/styles/Login.module.scss'
import {NotificationPlacement} from "antd/es/notification/interface";
const cx = classNames.bind(styles)


function LoginPage() {

    const [api, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false)


    const openNotification = (placement: NotificationPlacement, value: string) => {
        api.info({
            message: `Уведомление!`,
            description:
            value,
            placement,
        });
    };


    const handleSubmit = async (values, actions) => {
        actions.setSubmitting(false)
        setIsLoading(true)
        try {
            const response = await axios.post('/api/login', values)


            if (response.status === 200) {
                cookie.set('token', response.headers['authorization']);
                Router.push('/profile')
                setIsLoading(false)
            }

        } catch (error) {
            if (error.response.status === 401) {
                setTimeout(() => {
                    setIsLoading(false)
                    openNotification('bottom', 'Ошибка.... Неверный логин или пароль')
                }, 2000)
            } else {
                console.error(error)
            }
        }
    }


    return (
        <section className={cx('login-page')}>
            {contextHolder}

            <Typography className={cx('login-page__title')} >Мини соц сеть</Typography>
            <Typography className={cx('login-page__subtitle')} >Введите логин и пароль!</Typography>

            <Formik
                enableReinitialize
                initialValues={{email: '', password: ''}}
                onSubmit={handleSubmit}
            >
                <Form className={cx('login-page__form')}>
                    <div>
                        <div className={cx('login-page__item')}>
                            <Typography>Email</Typography>
                            <Field className={cx('login-page__item_input')} name="email"
                                   as={Input}/>
                        </div>

                        <div className={cx('login-page__item')}>
                            <Typography>Пароль</Typography>
                            <Field className={cx('login-page__item_input')} name="password"
                                   as={Input}/>
                        </div>

                        <div  className={cx('login-page__submit')} >
                            <Button size='middle' htmlType="submit">Войти</Button>
                        </div>


                    </div>
                </Form>
            </Formik>

            <div>
                <Loader visible={isLoading}/>
            </div>
        </section>
    )
}

export default LoginPage;


export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies.token;

    if (token) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };
    }

    return {
        props: {}
    };
}
