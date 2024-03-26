import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { AnimeCard, PageLoading, Pagination } from "..";

import { AnimeData, Root } from "@/interfaces";

import { ReactNode, useEffect, useRef } from "react";
import useFetch from "@/hooks/useFetch";
import { useAnimeStore } from "@/store";

interface ResultMessageProps {
  children: ReactNode;
  column?: boolean;
}

interface SearchResultProps {
  page: number;
}

const ResultMessage = ({ children, column }: ResultMessageProps) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction={column ? "column" : undefined}
      style={{
        height: "calc(100% - 3.5625rem)",
      }}
    >
      {children}
    </Flex>
  );
};

const SearchAnimeResult = ({ page }: SearchResultProps) => {
  const {
    currentPage,
    lastPage,
    searchAnimeName,
    setLastPage,
    setCurrentPage,
  } = useAnimeStore();

  const { data, isLoading } = useFetch<Root>(
    searchAnimeName !== ""
      ? `anime?q=${searchAnimeName}&genres_exclude={9, 12}&limit=24&page=${page}`
      : null
  );

  const animeList = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (data) {
      const lastVisiablePage = data.pagination.last_visible_page;
      setLastPage(lastVisiablePage);
    }
  }, [data, setLastPage]);

  if (searchAnimeName !== "") {
    if (isLoading) {
      return <PageLoading />;
    }

    if (data?.pagination.items.count == 0) {
      return (
        <ResultMessage column>
          <Text as="p" size="6" weight="medium" color="plum" align="center">
            Nenhum resultado encontrado
          </Text>
        </ResultMessage>
      );
    }

    return (
      <Box
        style={{
          minHeight: "13.25rem",
          maxHeight: "calc(100% - 3.5625rem)",
          overflow: "auto",
        }}
        ref={animeList}
      >
        {lastPage > 1 ? (
          <Pagination
            position="top"
            currentPage={currentPage}
            lastPage={lastPage}
            elementRef={animeList}
            setPage={setCurrentPage}
          />
        ) : null}
        <Grid columns="2" gap="2" asChild>
          <ul>
            {data?.data!.map(
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
        {lastPage > 1 ? (
          <Pagination
            position="bottom"
            currentPage={currentPage}
            lastPage={lastPage}
            elementRef={animeList}
            setPage={setCurrentPage}
          />
        ) : null}
      </Box>
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
