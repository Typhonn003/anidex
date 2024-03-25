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
      className="animate-pulse"
      style={{ height: "calc(100% - 3.5625rem)", overflow: "hidden" }}
    >
      {cards}
    </Grid>
  );
};

export default PageLoading;
