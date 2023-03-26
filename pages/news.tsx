import axios from "axios";
import React, {useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Select} from "antd";
import styles from '../styles/News.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)



export default function Posts({posts, users}) {

    const [postsArray, setPostsArray] = useState(posts);
    const [hasMore, setHasMore] = useState(true);

    const [sortOrder, setSortOrder] = useState('ascending');

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
        sortBooks(event.target.value);
    };

    const sortBooks = (order) => {
        const sortedBooks = postsArray.slice().sort((a, b) => {
            if (order === 'ascending') {
                return a.userId - b.userId;
            } else {
                return b.userId - a.userId;
            }
        });

        setPostsArray(sortedBooks);
    };




    const getMorePost = async () => {

        const response = await axios.post('/api/posts', {start: postsArray.length})

        const newPhotos = await response.data.data;
        setPostsArray((photos) => [...photos, ...newPhotos]);
    };

    return (
        <>



            <Select
                defaultValue={users[0].name}
                style={{ width: 120 }}
                onChange={handleSortOrderChange}
                options={users.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })}
            />


            <InfiniteScroll
                dataLength={postsArray.length}
                next={getMorePost}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                {postsArray.map((item) => (
                    <div key={item.id}>
                        <div className="back">
                            <strong> {item.id}</strong> {item.title}
                        </div>
                    </div>
                ))}
            </InfiniteScroll>

        </>
    );
}




export async function getServerSideProps() {
    const postsArray = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=12&_page=1');
    const usersArray = await axios.get('https://jsonplaceholder.typicode.com/users');
    const posts = postsArray.data;
    const users = usersArray.data;

    return {
        props: {
            posts, users
        }
    };
}
