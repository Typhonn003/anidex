import { Box, Button, Flex, Separator, TextField } from "@radix-ui/themes";
import { CardDisplay, SearchAnimeResult } from "..";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

import { Root } from "@/interfaces";

import { useState, ChangeEvent, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

const SearchAnime = () => {
  const [animeName, setAnimeName] = useState<string>("");
  const [searchAnimeName, setSearchAnimeName] = useState<string>("");
  const [hasPagination, setHasPagination] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(0);
  const { data, isLoading } = useFetch<Root>(
    searchAnimeName !== ""
      ? `anime?q=${searchAnimeName}&genres_exclude={9, 12}&limit=24&page=${currentPage}`
      : null
  );

  useEffect(() => {
    if (data) {
      const lastVisiablePage = data.pagination.last_visible_page;

      if (lastVisiablePage > 1) {
        setHasPagination(true);
        setLastPage(lastVisiablePage);
      } else {
        setHasPagination(false);
      }
    }
  }, [data]);

  const handleAnimeName = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimeName(e.target.value);
  };

  const handleSeach = () => {
    setSearchAnimeName(animeName);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

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
              onChange={handleAnimeName}
            />
          </TextField.Root>
          <Button variant="classic" onClick={handleSeach}>
            Buscar
          </Button>
        </Flex>
        <Separator my="3" size="4" />
        <SearchAnimeResult
          data={data}
          searchAnimeName={searchAnimeName}
          isLoading={isLoading}
          hasPagination={hasPagination}
        />
        {hasPagination ? (
          <Flex
            justify={"end"}
            align={"center"}
            mt={"3"}
            height={"7"}
            gap={"2"}
          >
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
    </CardDisplay>
  );
};

export default SearchAnime;
