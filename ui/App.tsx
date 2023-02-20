import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Box, Button, Container, Group, Image, Stack, Text, Title } from "@mantine/core"
import { EVENT } from "../shared/constants"
import { useRequest } from "./Background"

const PASSWORD = "password"

const App = () => {
  const request = useRequest()

  const { data: vault } = useQuery(["vault"], () => request("getVault"))
  const { data: locked } = useQuery(["locked"], () => request("getLocked"))
  const { data: requested } = useQuery(["request"], () => request("getRequestedConnection"))
  const { data: address } = useQuery(["address"], () => request("getAddress"))
  const { data: accounts } = useQuery(["accounts"], () => request("getAccounts"))
  const { data: connectedSites } = useQuery(["connectedSites"], () => request("getConnectedSites"))

  const lock = () => request("lock")

  const queryClient = useQueryClient()

  useEffect(() => {
    window.addEventListener(EVENT.LOCKED, () => queryClient.invalidateQueries(["locked"]))
    window.addEventListener(EVENT.ADDRESS, () => queryClient.invalidateQueries(["address"]))
  }, [queryClient])

  const render = () => {
    if (!vault) {
      const createVault = async () => {
        await request("createVault", PASSWORD)
        queryClient.invalidateQueries(["vault"])
      }

      return (
        <Stack>
          <Title>Create vault</Title>
          <Button onClick={createVault}>Submit</Button>
        </Stack>
      )
    }

    if (locked) {
      const unlock = () => request("unlock", PASSWORD)

      return (
        <Stack>
          <Title>Locked</Title>
          <Button onClick={unlock}>Unlock</Button>
        </Stack>
      )
    }

    if (requested) {
      const { url, favicon } = requested

      const allow = () => request("allowConnection")
      const deny = () => request("denyConnection")

      return (
        <Stack>
          <Title>Requested</Title>

          <Group>
            <Image src={favicon} width={16} height={16} />
            <Text>{url}</Text>
          </Group>

          <Group grow>
            <Button onClick={deny} color="red" variant="outline">
              Deny
            </Button>
            <Button onClick={allow} color="green">
              Allow
            </Button>
          </Group>
        </Stack>
      )
    }

    const renderAccounts = () => {
      if (!accounts) return

      const setAddress = (address: string) => request("setAddress", address)

      return (
        <Box>
          <Title order={2}>Accounts</Title>
          <Text>{address}</Text>
          <Button.Group>
            {accounts.map((account) => (
              <Button variant="outline" onClick={() => setAddress(account)} key={account}>
                {account}
              </Button>
            ))}
          </Button.Group>
        </Box>
      )
    }

    const renderConnectedSites = () => {
      if (!connectedSites) return

      return (
        <Box>
          <Title order={2}>Connected sites</Title>
          {!connectedSites.length ? "No connected sites" : connectedSites.map((url) => <Text key={url}>{url}</Text>)}
        </Box>
      )
    }

    return (
      <Stack>
        {renderAccounts()}
        {renderConnectedSites()}
        <Button onClick={lock}>Lock</Button>
      </Stack>
    )
  }

  return (
    <Container size="xs" py="xl">
      {render()}
    </Container>
  )
}

export default App
