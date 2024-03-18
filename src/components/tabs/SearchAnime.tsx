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

import { AnimeData, Root } from "@/interfaces";

import { useState } from "react";
import { ReactNode } from "react";
import useFetch from "@/hooks/useFetch";

interface SearchResultProps {
  data: AnimeData[] | undefined;
  searchAnimeName: string;
  isLoading: boolean;
  noResults: boolean;
}

interface ResultMessageProps {
  children: ReactNode;
  column?: boolean;
}

const ResultMessage = ({ children, column }: ResultMessageProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction={column ? "column" : undefined}
      style={{ height: "calc(100% - 3.5625rem)" }}
    >
      {children}
    </Flex>
  );
};

const SearchResult = ({
  data,
  searchAnimeName,
  isLoading,
  noResults,
}: SearchResultProps) => {
  if (searchAnimeName !== "") {
    if (isLoading) {
      return (
        <ResultMessage>
          <Text as="p" size="5" weight="medium" color="plum" highContrast>
            Carregando...
          </Text>
        </ResultMessage>
      );
    }

    if (noResults) {
      return (
        <ResultMessage column>
          <Text as="p" size="6" weight="medium" color="plum" align="center">
            Nenhum resultado encontrado
          </Text>
        </ResultMessage>
      );
    }

    return (
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
          {data!.map(
            ({
              mal_id,
              title,
              images: {
                jpg: { image_url },
              },
            }: AnimeData) => (
              <AnimeCard key={mal_id} name={title} src={image_url} />
            )
          )}
        </ul>
      </Grid>
    );
  }

  return (
    <ResultMessage column>
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
        Sem resultados
      </Text>
    </ResultMessage>
  );
};

const SearchAnime = () => {
  const [animeName, setAnimeName] = useState<string>("");
  const [searchAnimeName, setSearchAnimeName] = useState<string>("");
  const { data, isLoading } = useFetch<Root>(
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
        <SearchResult
          data={data?.data}
          searchAnimeName={searchAnimeName}
          isLoading={isLoading}
          noResults={data?.pagination.items.count == 0}
        />
      </Box>
    </CardDisplay>
  );
};

export default SearchAnime;
