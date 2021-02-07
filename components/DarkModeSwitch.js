 import { useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Switch
      colorScheme="green"
      onChange={toggleColorMode}
    />
  )
}