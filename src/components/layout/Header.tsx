import { IconButton, Container, Heading, Flex } from "@radix-ui/themes";
import { MoonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-[var(--accent-12)]">
      <Container py="2" px="3">
        <Flex direction="row" justify="between" align="center">
          <Link href="/">
            <Heading color="plum" highContrast>
              ANIDEX
            </Heading>
          </Link>
          <IconButton variant="ghost" size="3" highContrast>
            <MoonIcon width="22" height="22" />
          </IconButton>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
