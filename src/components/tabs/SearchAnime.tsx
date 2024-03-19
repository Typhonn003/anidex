import { Box, Button, Flex, Separator, TextField } from "@radix-ui/themes";
import { CardDisplay, SearchAnimeResult } from "..";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { Root } from "@/interfaces";

import { useState, ChangeEvent } from "react";
import useFetch from "@/hooks/useFetch";

const SearchAnime = () => {
  const [animeName, setAnimeName] = useState<string>("");
  const [searchAnimeName, setSearchAnimeName] = useState<string>("");
  const { data, isLoading } = useFetch<Root>(
    searchAnimeName !== ""
      ? `anime?q=${searchAnimeName}&genres_exclude={9, 12}&limit=24`
      : null
  );

  const handleAnimeName = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimeName(e.target.value);
  };

  const handleSeach = () => {
    setSearchAnimeName(animeName);
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
        />
      </Box>
    </CardDisplay>
  );
};

export default SearchAnime;
