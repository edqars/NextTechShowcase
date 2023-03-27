import {UserForm} from "@component/components/UserForm/UserForm";
import {Button, Typography} from "antd";
import {useRouter} from "next/router";
import axiosInstance from "@component/utils/axiosInstance";

import styles from '@component/styles/Profile.module.scss'
import classnames from 'classnames/bind'
import SmallHeader from "@component/components/SmallHeader/SmallHeader";
const cx = classnames.bind(styles)

export default function Profile({users}) {

    const router = useRouter()

    return (
        <main className={cx('profile-page')}>

            <SmallHeader title={`Страница пользователя`} />

            <UserForm user={users}/>
        </main>
    )
}


export async function getServerSideProps() {
    const response = await axiosInstance.get('/users/1');
    const users = response.data;

    return {
        props: {users: users}
    };
}


