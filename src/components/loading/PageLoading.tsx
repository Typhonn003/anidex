import { Grid } from "@radix-ui/themes";
import { LoadCard } from "..";

const PageLoading = () => {
  const cards: JSX.Element[] = [];

  for (let i = 0; i < 6; i++) {
    cards.push(<LoadCard key={i} />);
  }

  return (
    <Grid
      columns="2"
      gap="2"
      className="h-[calc(100%-3.5625rem)] animate-pulse overflow-hidden"
    >
      {cards}
    </Grid>
  );
};

export default PageLoading;
