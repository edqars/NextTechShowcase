import React, {useState} from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";

import Image from 'next/image';
import axiosInstance from "@component/utils/axiosInstance";
import {Spin} from "antd";

import SmallHeader from "@component/components/SmallHeader/SmallHeader";

import styles from '@component/styles/Gallery.module.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)




export async function getServerSideProps() {
    const response = await axiosInstance.get('/photos?_limit=10&_page=1');
    const photos = response.data;

    return {
        props: {
            photos
        }
    };
}


export default function Photos({photos}) {

    const [photosArray, setPhotosArray] = useState(photos);
    const [hasMore, setHasMore] = useState(true);

    const getMorePhotos = async () => {
        const response = await axios.post('/api/photos', {start: photosArray.length})
        const newPhotos = await response.data.data;
        setPhotosArray((photos) => [...photos, ...newPhotos]);
    };


    return (
        <main className={cx('photos-page')} >

            <SmallHeader title={' Страница с фотографиями'} />

            <InfiniteScroll
                dataLength={photosArray.length}
                next={getMorePhotos}
                hasMore={hasMore}
                loader={<Spin size='large' />}
                endMessage={<h4>Больше постов нет</h4>}
            >
                {photosArray?.map((item) => (
                    <div className={cx('photos-page__item')} key={item.id}>

                        <Image width={300} height={300} src={item.url} alt="quad"/>

                            <p> {item.id}. {item.title}</p>
                    </div>
                ))}
            </InfiniteScroll>

        </main>
    );

}





