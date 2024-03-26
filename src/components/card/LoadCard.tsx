import { Box, Card, Inset } from "@radix-ui/themes";

const LoadCard = () => {
  return (
    <Card
      style={{
        borderColor: "var(--accent-3)",
        width: "full",
        height: 242,
      }}
      variant="classic"
    >
      <Inset clip="border-box" side="top" pb="current">
        <Box style={{ backgroundColor: "var(--accent-6)", height: 200 }} />
      </Inset>
      <Box
        style={{ backgroundColor: "var(--accent-3)", height: 18, width: "80%" }}
      />
    </Card>
  );
};

export default LoadCard;
