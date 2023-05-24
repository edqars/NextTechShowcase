import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';

import { Button, Input, notification, Typography } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import axios from 'utils/axiosInstance';

import classNames from 'classnames/bind';
import { useMutation } from '@tanstack/react-query';
import styles from './UserForm.module.scss';
import Loader from '../Loader/Loader.tsx';
import { IUser } from './User';

const cx = classNames.bind(styles);

export function UserForm({ user }: IUser) {
  const [api, contextHolder] = notification.useNotification();
  const [validUser, setValidUser] = useState(user);
  const [isLoading, setIsLoading] = useState(false);

  const openNotification = (
    placement: NotificationPlacement,
    value: string
  ) => {
    api.info({
      message: 'Notification!',
      description: value,
      placement,
    });
  };

  const mutation = useMutation(
    (variables) => axios.put('/users/1', variables).then((res) => res.data),
    {
      onMutate() {
        setIsLoading(true);
      },
      onSuccess(data) {
        setIsLoading(false);
        openNotification(
          'bottom',
          'Congrats! The user has been successfully updated'
        );
        setValidUser(data);
      },
      onError(error) {
        console.error('Failed ', { error });
      },
    }
  );

  async function handleSubmit2(values, actions) {
    actions.setSubmitting(false);
    mutation.mutateAsync(values);
  }

  return (
    <section className={cx('user-form')}>
      {contextHolder}
      <Formik
        enableReinitialize
        initialValues={validUser}
        onSubmit={handleSubmit2}
      >
        <Form className={cx('user-form__form')}>
          <div>
            <div className={cx('user-form__item')}>
              <Typography>Id</Typography>

              <Field
                disabled
                className={cx('user-form__item_input')}
                name="id"
                as={Input}
              />
            </div>

            <div className={cx('user-form__item')}>
              <Typography>name</Typography>
              <Field
                className={cx('user-form__item_input')}
                name="name"
                as={Input}
              />
            </div>

            <div className={cx('user-form__item')}>
              <Typography>username</Typography>
              <Field
                className={cx('user-form__item_input')}
                name="username"
                as={Input}
              />
            </div>

            <div className={cx('user-form__item')}>
              <Typography>email</Typography>
              <Field
                className={cx('user-form__item_input')}
                name="email"
                as={Input}
              />
            </div>

            <div className={cx('user-form__item')}>
              <Typography>Phone number</Typography>
              <Field
                className={cx('user-form__item_input')}
                name="phone"
                as={Input}
              />
            </div>

            <div className={cx('user-form__item')}>
              <Typography>Website</Typography>
              <Field
                className={cx('user-form__item_input')}
                name="website"
                as={Input}
              />
            </div>

            <div className={cx('user-form__submit')}>
              <Button size="middle" htmlType="submit">
                Save
              </Button>
            </div>
          </div>
        </Form>
      </Formik>

      <div>
        <Loader visible={isLoading} />
      </div>
    </section>
  );
}
