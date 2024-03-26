import { Box, Card, Inset } from "@radix-ui/themes";

const LoadCard = () => {
  return (
    <Card variant="classic" className="h-[15.125rem]">
      <Inset clip="border-box" side="top" pb="current">
        <Box className="h-[12.5rem] bg-[var(--accent-6)]" />
      </Inset>
      <Box className="h-[1.125rem] w-3/4 rounded-md bg-[var(--accent-3)]" />
    </Card>
  );
};

export default LoadCard;
