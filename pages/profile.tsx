import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@component/styles/Home.module.css'


import classnames from 'classnames'
import axios from "axios";
import {UserForm} from "@component/components/UserForm/UserForm";
import {Button, Typography} from "antd";
import Title from "antd/es/skeleton/Title";
import {useRouter} from "next/router";

const cx = classnames.bind(styles)

export default function Profile({users}) {

    const router = useRouter()

    return (
        <>
            <Typography style={{
                color: '#6442b8', fontWeight: 700, fontSize: '35px'
                // fontFamily: 'Montserrat'
            }}>СТРАНИЦА ЮЗЕРА</Typography>

            <div>
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
            </div>

            <UserForm user={users}/>
        </>
    )
}


export async function getServerSideProps() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
    const users = response.data;

    return {
        props: {users: users}
    };
}


// 1. через middleware (статья) . в корне проекта
// 2. добавить логику
// 3. ui библ, сделать layout
// 4. добавить тостер. отлавл запроса. Если пост не загрузился - рендер ошибки. Mockoon. замокать запрос и вернуть ошибку
// 5. vercel/ add repo. make deploy
// 4. readme описать как запустить продж. сскинуть ссылку на демо
// 4.
//
//


