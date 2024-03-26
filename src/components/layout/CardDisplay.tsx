import { ReactNode } from "react";
import { Card } from "@radix-ui/themes";

interface CardDisplayProps {
  children?: ReactNode;
}

const CardDisplay = ({ children }: CardDisplayProps) => {
  return (
    <Card
      variant="surface"
      className="h-[calc(100svh-7rem)] min-h-[25rem] !border-[var(--accent-6)] !bg-[var(--accent-3)]"
    >
      {children}
    </Card>
  );
};

export default CardDisplay;
