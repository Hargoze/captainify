import { Flex, useColorModeValue} from '@chakra-ui/react'

export const Container = (props) => {
  const color = useColorModeValue("white", "gray.500")

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={color}
      {...props}
      minH="100vh"
    />
  )
}