import { Image } from '@chakra-ui/react'

export const Thumbnail = ({url}) => {
    return (
        <Image 
            src={`${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}`} 
            w="315px" h="180px"
        />
    )
}