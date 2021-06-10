import { useUser } from "../context/UserContext";
import { Button, Paper, TextField, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth, uiConfig } from "../services/firebase";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    width: "100%",
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
  const { vendorLogin } = useUser();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const handleVendorLogin = async () => {
    await vendorLogin(email, pwd);
  };
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Iniciar sesion
      </Typography>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item xs={12} md={4} style={{ width: "100%" }}>
          <Paper className={classes.card}>
            <Typography variant="h5">Administrador</Typography>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.card}>
            <Typography variant="h5">Vendedor</Typography>
            <div className={classes.vendedor}>
              <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                className={classes.textField}
                label="Password"
                variant="outlined"
                value={pwd}
                type="password"
                onChange={(e) => setPwd(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleVendorLogin}
                disableElevation
              >
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
