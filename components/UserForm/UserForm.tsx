import  React, {useState} from "react"
import {Field, Form, Formik} from "formik"

import { Button, Row, Col, Input, Checkbox, notification, Modal, Spin} from "antd"
import {NotificationPlacement} from "antd/es/notification/interface";
import axios from "axios";

import styles from './UserForm.module.scss'
import classNames from 'classnames/bind'
import Loader from "@component/components/Loader/Loader";
const cx = classNames.bind(styles)



export const UserForm = ({user}) => {
    const [api, contextHolder] = notification.useNotification();
    const [validUser, setValidUser] = useState(user);
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
            console.log('AHAHAHAAHA', data.data.data)
            setValidUser(data.data.data)
            openNotification('bottom', 'Gratz! The User has been updated!')
        }
    }

    return (
        <div
            style={{
                marginTop: 20,
            }}
        >
            {contextHolder}
            <Formik
                enableReinitialize
                initialValues={validUser}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form
                        style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}
                    >
                        <div style={{flex: 1}}/>
                        <div style={{background: "white", flex: 1, padding: 40}}>


                            <Field className={cx('user-form__input')} name="name" as={Input}/>
                            <Field className={cx('user-form__input')} name="username" as={Input}/>
                            <Field className={cx('user-form__input')} name="email" as={Input}/>
                            <Field className={cx('user-form__input')} name="phone" as={Input}/>
                            <Field className={cx('user-form__input')} name="website" as={Input}/>
                            <Field className={cx('user-form__input')} name="company.name" as={Input}/>
                            <Field className={cx('user-form__input')} name="company.bs" as={Input}/>
                            <Field className={cx('user-form__input')} name="company.catchPhrase" as={Input}/>


                            <Row style={{marginTop: 60}}>
                                <Col offset={5}>
                                    <Button.Group>
                                        <Button htmlType="submit">Сохранить</Button>
                                    </Button.Group>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                )}
            </Formik>

            <div>
                <Loader visible={isLoading}/>
            </div>
        </div>
    )
}
