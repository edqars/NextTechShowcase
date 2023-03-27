import React, {useState} from "react"
import {Field, Form, Formik} from "formik"

import {Button, Input, notification, Typography} from "antd"
import {NotificationPlacement} from "antd/es/notification/interface";
import axios from "axios";

import Loader from "@component/components/Loader/Loader";
import {getUserPropertyLabel} from "@component/utils/getUserPropertyLabel";

import styles from './UserForm.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)


export const UserForm = ({user}) => {

    const [api, contextHolder] = notification.useNotification();
    const [validUser, setValidUser] = useState(user)
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
        const response = await axios.post('/api/profile', {values})

        const data = await response
        if (data.status === 200) {
            setIsLoading(false)
            setValidUser(data.data.data)
            openNotification('bottom', 'Поздравляю! Пользователь был успешно обновлен')
        }
    }

    return (
        <section className={cx('user-form')}>
            {contextHolder}
            <Formik
                enableReinitialize
                initialValues={validUser}
                onSubmit={handleSubmit}
            >
                <Form className={cx('user-form__form')}>
                    <div>

                        {
                            Object.keys(user).map((item) => {
                                if (item === 'address') return

                                if (item === 'company') {
                                    return (
                                        <div key={item}>
                                            <div className={cx('user-form__item')}>
                                                <Typography>Название компании</Typography>
                                                <Field className={cx('user-form__item_input')} name="company.name"
                                                       as={Input}/>
                                            </div>


                                            <div className={cx('user-form__item')}>
                                                <Typography>Продукт</Typography>
                                                <Field className={cx('user-form__item_input')}
                                                       name="company.catchPhrase"
                                                       as={Input}/>
                                            </div>

                                            <div className={cx('user-form__item')}>
                                                <Typography>Сфера</Typography>
                                                <Field className={cx('user-form__item_input')}
                                                       name="company.bs"
                                                       as={Input}/>
                                            </div>
                                        </div>
                                    )
                                }

                                return (
                                    <div className={cx('user-form__item')} key={item}>
                                        <Typography>{getUserPropertyLabel(item)}</Typography>
                                        <Field className={cx('user-form__item_input')}
                                               name={item}
                                               as={Input}/>
                                    </div>
                                )
                            })
                        }

                        <div className={cx('user-form__submit')}>
                            <Button size='middle' htmlType="submit">Сохранить</Button>
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
