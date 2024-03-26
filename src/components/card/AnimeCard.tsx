import { Card, Heading, Inset } from "@radix-ui/themes";
import Image from "next/image";

interface AnimeCardProps {
  src: string;
  name: string;
}

const AnimeCard = ({ src, name }: AnimeCardProps) => {
  return (
    <Card variant="classic" asChild className="!border-[var(--accent-6)]">
      <li>
        <Inset clip="border-box" side="top" pb="current">
          <Image
            src={src}
            width={160}
            height={200}
            alt={`Imagem de capa do anime ${name}`}
            className="h-[12.5rem] object-cover"
          />
        </Inset>
        <Heading
          as="h2"
          size="2"
          weight="medium"
          color="plum"
          highContrast
          className="overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {name}
        </Heading>
      </li>
    </Card>
  );
};

export default AnimeCard;
