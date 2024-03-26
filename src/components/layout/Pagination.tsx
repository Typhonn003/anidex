import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Text } from "@radix-ui/themes";

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

  const handlePage = (value: number) => {
    setPage(value);
    handleScroll();
  };

  const pageButtons = () => {
    const buttons = [];
    const totalPages = lastPage;

    buttons.push(
      <IconButton
        key={1}
        variant="classic"
        onClick={() => handlePage(1)}
        highContrast={currentPage == 1}
        aria-label="Botão para a página 1"
      >
        1
      </IconButton>,
    );

    if (totalPages > 3) {
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = 3;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 2;
      }

      if (startPage > 2) {
        buttons.push(<Text as="span">...</Text>);
      }

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <IconButton
            key={i}
            variant="classic"
            onClick={() => handlePage(i)}
            highContrast={currentPage == i}
            aria-label={`Botão para a página ${i}`}
          >
            {i}
          </IconButton>,
        );
      }

      if (endPage < totalPages - 1) {
        buttons.push(<Text as="span">...</Text>);
      }
    }

    if (totalPages > 1) {
      buttons.push(
        <IconButton
          key={totalPages}
          variant="classic"
          onClick={() => handlePage(totalPages)}
          highContrast={currentPage === totalPages}
          aria-label={`Botão para a página ${totalPages}`}
        >
          {totalPages}
        </IconButton>,
      );
    }

    return buttons;
  };

  return (
    <Flex
      justify="between"
      align="center"
      mt={position == "bottom" ? "3" : undefined}
      mb={position == "top" ? "3" : undefined}
      height="7"
    >
      <IconButton
        variant="classic"
        onClick={handlePreviousPage}
        disabled={currentPage == 1}
        aria-label="Botão para voltar para a página anterior"
      >
        <ArrowLeftIcon />
      </IconButton>
      {pageButtons()}
      <IconButton
        variant="classic"
        onClick={handleNextPage}
        disabled={currentPage == lastPage}
        aria-label="Botão para avançar para a próxima página"
      >
        <ArrowRightIcon />
      </IconButton>
    </Flex>
  );
};

export default Pagination;
