import { Image } from '@chakra-ui/react'

export const Thumbnail = ({url, width="315px", height="180px"}, props) => {
    return (
        <Image 
            src={`${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}`}
            {...props}
            w={width} h={height}
        />
    )
}