import {
  Box,
  Button,
  Container,
  Dialog,
  Flex,
  Heading,
  IconButton,
  Separator,
  Tabs,
} from "@radix-ui/themes";
import { CardDisplay, SearchAnime } from "@/components";
import { Cross1Icon } from "@radix-ui/react-icons";

const Home = () => {
  return (
    <main>
      <Container py="2" px="3">
        <Tabs.Root defaultValue="search">
          <Tabs.List className="flex justify-center">
            <Tabs.Trigger value="search">Buscar</Tabs.Trigger>
            <Tabs.Trigger value="genres">Gêneros</Tabs.Trigger>
            <Tabs.Trigger value="favorites">Favoritos</Tabs.Trigger>
          </Tabs.List>
          <Box pt="2">
            <Tabs.Content value="search">
              <SearchAnime />
            </Tabs.Content>
            <Tabs.Content value="genres">
              <CardDisplay>
                <Box height="100%">
                  <Flex justify="between" align="center">
                    <Heading
                      color="plum"
                      as="h2"
                      size="3"
                      weight="medium"
                      highContrast
                    >
                      Selecione um gênero
                    </Heading>
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button variant="classic">Gêneros</Button>
                      </Dialog.Trigger>
                      <Dialog.Content>
                        <Flex justify="between">
                          <Dialog.Title color="plum" highContrast>
                            Gêneros
                          </Dialog.Title>
                          <Dialog.Close>
                            <IconButton
                              variant="ghost"
                              aria-label="Fechar o modal de gêneros"
                            >
                              <Cross1Icon width="18" height="18" />
                            </IconButton>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                  </Flex>
                  <Separator my="3" size="4" />
                </Box>
              </CardDisplay>
            </Tabs.Content>
            <Tabs.Content value="favorites">
              <CardDisplay></CardDisplay>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Container>
    </main>
  );
};

export default Home;
