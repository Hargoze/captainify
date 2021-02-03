import { Image } from '@chakra-ui/react'

export const Avatar = ({url}) => {
    return (
        <Image 
            src={`${url.startsWith('/') ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ''}${url}`}
            boxSize="48px"
            borderRadius="full"
        />
    )
}