import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { AnimeCard, PageLoading } from "..";

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

  const handleScroll = () => {
    setTimeout(() => {
      if (animeList.current)
        animeList.current.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    handleScroll();
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    handleScroll();
  };

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
          overflow: "scroll",
        }}
        ref={animeList}
      >
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
          <Flex justify="end" align="center" mt="3" height="7" gap="2">
            <Button
              variant="classic"
              onClick={previousPage}
              disabled={currentPage == 1}
            >
              <ArrowLeftIcon />
              Anterior
            </Button>
            <Button
              variant="classic"
              onClick={nextPage}
              disabled={currentPage == lastPage}
            >
              Próximo
              <ArrowRightIcon />
            </Button>
          </Flex>
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
