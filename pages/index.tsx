
export default function Home() {

    return (
        <>
           INDEX PAGE WAS HERE
        </>
    )
}


export async function getStaticProps(context) {

        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };

}
