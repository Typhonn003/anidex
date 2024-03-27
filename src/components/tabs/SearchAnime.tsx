import {
  Box,
  Button,
  Flex,
  IconButton,
  Separator,
  TextField,
} from "@radix-ui/themes";
import { CardDisplay, SearchAnimeResult } from "..";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { ChangeEvent } from "react";
import { useAnimeStore } from "@/store";

const SearchAnime = () => {
  const {
    animeName,
    currentPage,
    setAnimeName,
    setSearchAnimeName,
    setCurrentPage,
  } = useAnimeStore();

  const handleAnimeName = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimeName(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchAnimeName(animeName);
  };

  const deleteSearch = () => {
    setAnimeName("");
    setSearchAnimeName("");
  };

  return (
    <CardDisplay>
      <Box height="100%">
        <Flex gap="2">
          <TextField.Root className="w-full">
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              placeholder="Procurar anime..."
              value={animeName}
              onChange={handleAnimeName}
            />
            {animeName ? (
              <TextField.Slot>
                <IconButton
                  variant="ghost"
                  onClick={deleteSearch}
                  aria-label="Botão para apagar a pesquisa e os resultados"
                >
                  <Cross1Icon />
                </IconButton>
              </TextField.Slot>
            ) : null}
          </TextField.Root>
          <Button
            variant="classic"
            onClick={handleSearch}
            disabled={animeName.length < 3}
          >
            Buscar
          </Button>
        </Flex>
        <Separator my="3" size="4" />
        <SearchAnimeResult page={currentPage} />
      </Box>
    </CardDisplay>
  );
};

export default SearchAnime;
