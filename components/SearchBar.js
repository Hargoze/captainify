import { Flex, Box, Input, IconButton} from "@chakra-ui/react";
import {SearchIcon} from '@chakra-ui/icons'
import { search, } from '../lib/api'

const MeiliSearch = require("meilisearch");

const config = {
  host: 'http://127.0.0.1:7700',
  apiKey: 'masterKey',
}

const client = new MeiliSearch(config)

export const SearchBar = ({setResult, input, setInput, offset}) => {

    return (
        <Flex mt={{base:"40", sm:"24"}} w="100%" align="center" justify="center">
            <Box color="black"
                as="input"
                w={{base:"80%", md:"300px", lg:"375px"}}
                placeholder="search music"
                py={2}
                px={4}
                rounded="md"
                bg="gray.100"
                borderWidth="1px"
                _hover={{ borderColor: "gray.200", bg: "gray.200" }}
                _focus={{
                outline: "none",
                bg: "white",
                boxShadow: "outline",
                borderColor: "gray.300",
                
                }}
                type='text'
                value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={() => search(setResult, input, offset)}
                >
            </Box>
            
            <IconButton bg="gray.400" _hover={{ bg:"gray.600" }}color="white" aria-label="Search post" icon={<SearchIcon />} 
            onClick={() => search(setResult, input, offset)} ml="2"/>
            
        </Flex>
  )
}