import {
  Box,
  Button,
  Container,
  Flex,
  Separator,
  Tabs,
  TextField,
} from "@radix-ui/themes";
import { CardDisplay } from "@/components";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Home = () => {
  return (
    <main>
      <Container py="2" px="3">
        <Tabs.Root defaultValue="search">
          <Tabs.List style={{ display: "flex", justifyContent: "center" }}>
            <Tabs.Trigger value="search">Buscar</Tabs.Trigger>
            <Tabs.Trigger value="genres">Gêneros</Tabs.Trigger>
            <Tabs.Trigger value="favorites">Favoritos</Tabs.Trigger>
          </Tabs.List>
          <Box pt="2">
            <Tabs.Content value="search">
              <CardDisplay>
                <Box>
                  <Flex gap="2" style={{ justifyContent: "space-between" }}>
                    <TextField.Root style={{ width: "100%" }}>
                      <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                      </TextField.Slot>
                      <TextField.Input placeholder="Procurar anime..." />
                    </TextField.Root>
                    <Button variant="classic">Buscar</Button>
                  </Flex>
                  <Separator my="3" size="4" />
                </Box>
              </CardDisplay>
            </Tabs.Content>
            <Tabs.Content value="genres"></Tabs.Content>
            <Tabs.Content value="favorites"></Tabs.Content>
          </Box>
        </Tabs.Root>
      </Container>
    </main>
  );
};

export default Home;
