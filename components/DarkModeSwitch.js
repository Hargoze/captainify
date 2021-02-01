 import { useColorMode, Switch } from '@chakra-ui/react'

export const DarkModeSwitch = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      onChange={toggleColorMode}
    />
  )
}