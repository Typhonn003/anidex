import { ReactNode } from "react";
import { Card } from "@radix-ui/themes";

interface CardDisplayProps {
  children?: ReactNode;
}

const CardDisplay = ({ children }: CardDisplayProps) => {
  return (
    <Card
      variant="surface"
      style={{
        minHeight: "25rem",
        height: "calc(100svh - 7rem)",
        backgroundColor: "var(--accent-a3)",
        borderColor: "var(--accent-a6)",
      }}
    >
      {children}
    </Card>
  );
};

export default CardDisplay;
