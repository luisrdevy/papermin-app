import { Grid, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">Papermin</Typography>
          <Typography variant="h4">
            La mejor forma de administrar tu papeleria
          </Typography>
        </Grid>
      </Grid>
      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Caracteristicas</Typography>
          <Typography variant="h4">
            La mejor forma de administrar tu papeleria
          </Typography>
        </Grid>
      </Grid> */}
    </>
  );
};

export default Home;
