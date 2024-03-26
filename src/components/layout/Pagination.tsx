import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Button, Flex, Select, Text } from "@radix-ui/themes";

import { MutableRefObject } from "react";

interface PaginationProps {
  position: "top" | "bottom";
  currentPage: number;
  lastPage: number;
  setPage: (value: number) => void;
  elementRef: MutableRefObject<HTMLDivElement | null>;
}

const Pagination = ({
  position,
  currentPage,
  lastPage,
  setPage,
  elementRef,
}: PaginationProps) => {
  const pagesArr: number[] = Array.from(
    { length: lastPage },
    (_, index) => index + 1,
  );

  const handleScroll = () => {
    setTimeout(() => {
      if (elementRef.current)
        elementRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleNextPage = () => {
    setPage(currentPage + 1);
    handleScroll();
  };

  const handlePreviousPage = () => {
    setPage(currentPage - 1);
    handleScroll();
  };

  const handleSelectPage = (value: number) => {
    setPage(value);
    handleScroll();
  };

  return (
    <Flex
      justify="between"
      align="center"
      mt={position == "bottom" ? "3" : undefined}
      mb={position == "top" ? "3" : undefined}
      height="7"
      gap="2"
    >
      <Button
        variant="classic"
        onClick={handlePreviousPage}
        disabled={currentPage == 1}
      >
        <ArrowLeftIcon />
        Anterior
      </Button>
      <Flex align="center" gap={"2"}>
        <Select.Root
          defaultValue={currentPage.toString()}
          value={currentPage.toString()}
          onValueChange={(value) => handleSelectPage(Number(value))}
        >
          <Select.Trigger aria-label="Lista de páginas" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Página</Select.Label>
              {pagesArr.map((item) => (
                <Select.Item key={item} value={item.toString()}>
                  {item}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Text color="plum" weight="medium" highContrast>
          de {lastPage}
        </Text>
      </Flex>
      <Button
        variant="classic"
        onClick={handleNextPage}
        disabled={currentPage == lastPage}
      >
        Próximo
        <ArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
