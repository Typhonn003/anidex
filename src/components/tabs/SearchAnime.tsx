import {
  Box,
  Button,
  Flex,
  Grid,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { AnimeCard, CardDisplay } from "..";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";

const SearchAnime = () => {
  const [animeName, setAnimeName] = useState<string>("");
  const [searchAnimeName, setSearchAnimeName] = useState<string>("");
  const { data, isLoading } = useFetch(
    searchAnimeName !== ""
      ? `anime?q=${searchAnimeName}&genres_exclude={9, 12}&limit=24`
      : null
  );

  return (
    <CardDisplay>
      <Box height="100%">
        <Flex gap="2">
          <TextField.Root style={{ width: "100%" }}>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="Procurar anime..."
              value={animeName}
              onChange={(e) => setAnimeName(e.target.value)}
            />
          </TextField.Root>
          <Button
            variant="classic"
            onClick={() => setSearchAnimeName(animeName)}
          >
            Buscar
          </Button>
        </Flex>
        <Separator my="3" size="4" />
        {searchAnimeName ? (
          isLoading ? (
            <Flex
              justify="center"
              align="center"
              style={{ height: "calc(100% - 3.5625rem)" }}
            >
              <Text as="p" size="5" weight="medium" color="plum" highContrast>
                Carregando...
              </Text>
            </Flex>
          ) : data.pagination.items.count > 1 ? (
            <Grid
              style={{
                minHeight: "13.25rem",
                maxHeight: "calc(100% - 3.5625rem)",
                overflow: "auto",
              }}
              columns="2"
              gap="2"
              asChild
            >
              <ul>
                {data.data.map((anime: any) => (
                  <AnimeCard
                    key={anime.mal_id}
                    name={anime.title}
                    src={anime.images.jpg.image_url}
                  />
                ))}
              </ul>
            </Grid>
          ) : (
            <Flex
              justify="center"
              align="center"
              direction="column"
              style={{ height: "calc(100% - 3.5625rem)" }}
            >
              <Text as="p" size="6" weight="medium" color="plum" align="center">
                Nenhum resultado encontrado
              </Text>
            </Flex>
          )
        ) : (
          <Flex
            justify="center"
            align="center"
            direction="column"
            style={{ height: "calc(100% - 3.5625rem)" }}
          >
            <Text
              size="8"
              weight="medium"
              color="plum"
              aria-label="Caracteres que formam a imagem de um personagem chorando"
              highContrast
            >
              o(TヘTo)
            </Text>
            <Text as="p" size="7" weight="medium" color="plum">
              Procure um nome
            </Text>
          </Flex>
        )}
      </Box>
    </CardDisplay>
  );
};

export default SearchAnime;
