import { Flex, Stack, Text, Link, useColorModeValue} from '@chakra-ui/react'
import { Thumbnail } from "./Thumbnail"
import { Avatar } from "./Avatar"

export const SongBox = ({songs}) => {
    const bg = useColorModeValue("gray.100", "gray.700")
    const textColor = useColorModeValue("black", "white")

    return (
      <Stack my="24" bg={bg} width="80%" color={textColor}>
        {songs.map((current, i) => (
          <Link _hover={{textDecoration:"none"}} key={i} >
            <Flex height="180px" shadow="0 7px 29px -12px rgba(0,0,0,34)" bg={bg}
            _hover={{textDecoration:"none", transform: "scale(1.02)"}}>
                <Thumbnail url={current.thumbnail.url}/>
                <Stack w="100%" alignItems="start" px="6" justify="space-around">
                   <Text fontSize="24px" >{current.title}</Text>
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