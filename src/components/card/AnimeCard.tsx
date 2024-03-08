import { Card, Heading, Inset } from "@radix-ui/themes";
import Image from "next/image";

interface AnimeCardProps {
  src: string;
  name: string;
}

const AnimeCard = ({ src, name }: AnimeCardProps) => {
  return (
    <li style={{ maxWidth: 140 }}>
      <Card
        style={{
          borderColor: "var(--accent-a6)",
          width: "full",
        }}
        variant="classic"
      >
        <Inset clip="border-box" side="top" pb="current">
          <Image
            src={src}
            width={140}
            height={170}
            alt={`Imagem de capa do anime ${name}`}
            style={{ height: 170, objectFit: "cover" }}
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
      </Card>
    </li>
  );
};

export default AnimeCard;
