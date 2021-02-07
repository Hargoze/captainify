import { Flex, useColorModeValue, IconButton, Link} from '@chakra-ui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { GiPirateFlag } from "react-icons/gi";
export const Header = () => {
  const color = useColorModeValue("white", "gray.500")

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bg="gray.500"
      h="24"
      w="100%"
      px="8"
    >
        <Link href="/" >
            <IconButton as={GiPirateFlag} bg="black" color="white" _hover={{bg:"black", transform: "scale(1.02)"}} p="2" w="90px" h="75px"/>
        </Link>
        <DarkModeSwitch />
    </Flex>
  )
}