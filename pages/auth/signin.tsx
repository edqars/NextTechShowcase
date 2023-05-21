import React from 'react';
import { getProviders, getSession, signIn } from 'next-auth/react';

import classNames from 'classnames/bind';
import { Button, Input, Typography } from 'antd';
import { Field, Form, Formik } from 'formik';
import styles from '../../styles/Login.module.scss';

const cx = classNames.bind(styles);

function Signin({ providers }) {
  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signIn('credentials', {
        email,
        password,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={cx('login-page')}>
      <Typography className={cx('login-page__title')}>
        Wow hello there!
      </Typography>
      <Typography className={cx('login-page__subtitle')}>
        Введите логин и пароль!
      </Typography>

      <Formik
        enableReinitialize
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      >
        <Form action="pages/auth/signin#" className={cx('login-page__form')}>
          <div>
            <div className={cx('login-page__item')}>
              <Typography>Email</Typography>
              <Field
                className={cx('login-page__item_input')}
                name="email"
                as={Input}
              />
            </div>

            <div className={cx('login-page__item')}>
              <Typography>Пароль</Typography>
              <Field
                className={cx('login-page__item_input')}
                name="password"
                as={Input}
              />
            </div>

            <div className={cx('login-page__submit')}>
              <Button size="middle" htmlType="submit">
                Войти
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

export default Signin;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  return {
    props: {
      providers,
    },
  };
}
