import { Flex, Stack, Heading, Box, Text, Tag, TagLabel, Link, useColorModeValue} from '@chakra-ui/react'
import { Thumbnail } from "./Thumbnail"

export const SongBox = ({songs}) => {
    const bg = useColorModeValue("gray.100", "gray.700")
    const textColor = useColorModeValue("black", "white")

    return (
      <Stack my="24" bg={bg} width="80%" color={textColor}>
        {songs.map((current, i) => (
            <Flex height="180px" shadow="0 7px 29px -12px rgba(0,0,0,34)" bg={bg}
            _hover={{textDecoration:"none", transform: "scale(1.02)"}} key={i}>
                <Thumbnail url={current.thumbnail.url}/>
                <Stack w="100%" alignItems="start" px="6" justify="space-around">
                   <Text fontSize="24px" >{current.title}</Text>
                   <Text>{current.author.name}</Text> 
                </Stack>
            </Flex>
        ))}
      </Stack>
    )
}