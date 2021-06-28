import { Flex, Stack, Text, Link, useColorModeValue} from '@chakra-ui/react'
import { Thumbnail } from "./Thumbnail"
import { Avatar } from "./Avatar"

export const SongBox = ({songs}) => {
    const bg = useColorModeValue("gray.100", "gray.700")
    const textColor = useColorModeValue("black", "white")

    console.log(songs)

    if (!songs) {
      return (
      <Stack >
        <Text>something went wrong, sorry bout that</Text>
      </Stack>
    )}
    if (songs.length === 0) {
      return (
      <Stack my="24" align="center" color="red.500">
        <Text fontSize="28px" fontWeight="bold">sorry, no match found ;(</Text>
      </Stack>
    )}
    return (
      <Stack my="24" width={{base:"80%", md:"60%", lg:"40%"}} color={textColor} align="center">
        {songs.map((current, i) => (
          <Link _hover={{textDecoration:"none"}} key={i} href={`/songs/${current.id}`} pt="4">
            <Flex direction={{base: "column", md:"row"}} shadow="0 7px 29px -12px rgba(0,0,0,34)" bg={bg}
            _hover={{textDecoration:"none", transform: "scale(1.02)"}} w={{base:"315px", md:"630px"}}>
                <Thumbnail url={current.thumbnail.url} borderRadius="full"/>
                <Stack w="100%" alignItems="start" px="6" justify="space-around" py={{base:"6",lg:"0"}}>
                   <Text fontSize="24px" textOverflow="ellipsis" noOfLines={{base:1, md:2}}>{current.title}</Text>
                   <Flex justify="center" align="center">
                     <Avatar url={current.author.picture.url}/>
                     <Text fontSize="18px" pl="4">{current.author.name}</Text>
                    </Flex>
                </Stack>
            </Flex>
          </Link>
        ))}
      </Stack>
    )
}