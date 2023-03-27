import React, {useState} from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import {Button, Select, Spin} from "antd";
import axiosInstance from "@component/utils/axiosInstance";

import styles from '../styles/News.module.scss'
import classNames from 'classnames/bind'
import SmallHeader from "@component/components/SmallHeader/SmallHeader";

const cx = classNames.bind(styles)


export default function Posts({posts, users}) {


    const [postsArray, setPostsArray] = useState(posts);
    const [hasMore, setHasMore] = useState(true);

    const [sortBy, setSortBy] = useState('userId');


    function sortPosts() {
        setPosts([...posts].sort((a, b) => a[sortBy].localeCompare(b[sortBy])));
    }


    function handleSortByChange(event) {
        setSortBy(event);
    }


    const getMorePost = async () => {
        const response = await axios.post('/api/news', {start: postsArray.length})
        const newPhotos = await response.data.data;
        setPostsArray((photos) => [...photos, ...newPhotos]);
    };

    return (
        <main className={cx('news-page')}>

            <SmallHeader title={'Страница с новостями'}/>

            <div className={cx('news-page__content')}>

                <div className={cx('news-page__sorting')}>
                    <Select
                        defaultValue={users[0].name}
                        className={cx('news-page__select')}
                        onChange={handleSortByChange}
                        options={users.map(item => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                    <Button type="primary" onClick={sortPosts}>Sort</Button>
                </div>

                <InfiniteScroll
                    className={cx('news-page__list')}
                    dataLength={postsArray.length}
                    next={getMorePost}
                    hasMore={hasMore}
                    loader={<Spin size='large'/>}
                    endMessage={<h4>Больше постов нет</h4>}
                >
                    {postsArray.map((item, index) => (
                        <div className={cx('news-page__item')} key={item.id}>

                            <div className={cx('news-page__item_title')}>

                                <strong>
                                    {index + 1}.&nbsp;
                                </strong>
                                {item.title}

                            </div>

                            <p>{item.body}</p>

                            <p>@{users[item.userId].name}</p>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>

        </main>
    );
}


export async function getServerSideProps() {
    const postsArray = await axiosInstance.get('/posts?_limit=12&_page=1');
    const usersArray = await axiosInstance.get('/users');
    const posts = postsArray.data;
    const users = usersArray.data;

    return {
        props: {
            posts, users
        }
    };
}
