import { Flex, Stack, Text, Link} from '@chakra-ui/react'
import { Thumbnail } from "./Thumbnail"
import { Avatar } from "./Avatar"

export const SongBox = ({songs}) => {

    return (
      <Stack align="center" >
        {songs.map((current, i) => (
          <Link _hover={{textDecoration:"none"}} key={i} href={`/songs/${current.id}`} my="4" >
            <Flex direction={{base: "column", md:"row"}} shadow="0 7px 29px -12px rgba(0,0,0,34)">
                <Thumbnail url={current.thumbnail.url} />
                <Stack>
                   <Text>{current.title}</Text>
                   <Flex>
                     <Avatar url={current.author.picture.url}/>
                     <Text>{current.author.name}</Text>
                    </Flex>
                </Stack>
            </Flex>
          </Link>
        ))}
      </Stack>
    )
}