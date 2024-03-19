import { Flex, Grid, Text } from "@radix-ui/themes";
import { AnimeCard } from "..";

import { AnimeData, Root } from "@/interfaces";

import { ReactNode } from "react";

interface ResultMessageProps {
  children: ReactNode;
  column?: boolean;
}

interface SearchResultProps {
  data: Root | undefined;
  searchAnimeName: string;
  isLoading: boolean;
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

const SearchAnimeResult = ({
  data,
  searchAnimeName,
  isLoading,
}: SearchResultProps) => {
  const animeData = data?.data;
  const noResults = data?.pagination.items.count == 0;

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
          {animeData!.map(
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

export default SearchAnimeResult;
