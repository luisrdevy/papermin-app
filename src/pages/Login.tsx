import { useUser } from "../context/UserContext";

import { Button, Paper, TextField, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  vendedor: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
  },
  admin: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  button: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

const Login = () => {
  const classes = useStyles();
  const { login } = useUser();
  return (
    <>
      <Typography variant="h4">Iniciar sesion</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.card}>
            <Typography variant="h5">Administrador</Typography>
            <div className={classes.admin}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                disableElevation
                onClick={login}
              >
                Iniciar sesion con Google
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disableElevation
              >
                Iniciar sesion con Facebook
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.card}>
            <Typography variant="h5">Vendedor</Typography>
            <div className={classes.vendedor}>
              <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Password"
                variant="outlined"
              />
              <Button variant="contained" disableElevation>
                Iniciar sesion
              </Button>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
