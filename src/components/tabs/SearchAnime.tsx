import { Box, Button, Flex, Separator, TextField } from "@radix-ui/themes";
import { CardDisplay, SearchAnimeResult } from "..";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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

  const handleSeach = () => {
    setCurrentPage(1);
    setSearchAnimeName(animeName);
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
          </TextField.Root>
          <Button
            variant="classic"
            onClick={handleSeach}
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
