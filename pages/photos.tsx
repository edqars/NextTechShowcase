import Head from 'next/head'
import styles from '@component/styles/Gallery.module.scss'
import axios from "axios";
import React, {useState} from "react";
import PhotoGalleryPage from "@component/components/PhotoGalleryPage/PhotoGalleryPage";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from 'next/image';

export async function getServerSideProps() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1');
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
        <>
            <InfiniteScroll
                dataLength={photosArray.length}
                next={getMorePhotos}
                hasMore={hasMore}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                {photosArray.map((item) => (
                    <div key={item.id}>
                        <div className="back">
                            <strong> {item.id}</strong> {item.title}
                        </div>
                        <Image width={150} height={150} src={item.thumbnailUrl} alt="ddd"/>
                    </div>
                ))}
            </InfiniteScroll>

        </>
    );

}





