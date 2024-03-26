import { Card, Heading, Inset } from "@radix-ui/themes";
import Image from "next/image";

interface AnimeCardProps {
  src: string;
  name: string;
}

const AnimeCard = ({ src, name }: AnimeCardProps) => {
  return (
    <Card
      style={{
        borderColor: "var(--accent-a6)",
        width: "full",
      }}
      variant="classic"
      asChild
    >
      <li>
        <Inset clip="border-box" side="top" pb="current">
          <Image
            src={src}
            width={160}
            height={200}
            alt={`Imagem de capa do anime ${name}`}
            style={{ height: 200, objectFit: "cover" }}
          />
        </Inset>
        <Heading
          as="h2"
          size="2"
          weight="medium"
          color="plum"
          highContrast
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {name}
        </Heading>
      </li>
    </Card>
  );
};

export default AnimeCard;
