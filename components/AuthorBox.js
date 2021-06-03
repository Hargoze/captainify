import { Flex, Stack, Text, Link, useColorModeValue, SimpleGrid} from '@chakra-ui/react'
import { Thumbnail } from "./Thumbnail"

export const AuthorBox = ({songs}) => {
    const bg = useColorModeValue("gray.100", "gray.700")
    const textColor = useColorModeValue("black", "white")

    return (
      <SimpleGrid columns={{base: 1, lg: 2}} spacing={10} mt="8" bg="pink.300">
        {songs.map((current, i) => (
          <Link _hover={{textDecoration:"none"}} key={i} href={`/songs/${current.id}`} my="4" >
            <Flex direction={{base: "column", md:"row"}} shadow="0 7px 29px -12px rgba(0,0,0,34)" bg={bg}
            _hover={{textDecoration:"none", transform: "scale(1.02)"}} w={{base:"315px", md:"630px"}}>
                <Thumbnail url={current.thumbnail.url} borderRadius="full"/>
                <Stack w="100%" alignItems="start" px="6" justify="space-around" py={{base:"6",lg:"0"}}>
                   <Text fontSize="24px" textOverflow="ellipsis" noOfLines={{base:1, md:2}} color={textColor}>{current.title}</Text>
                </Stack>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    )
}