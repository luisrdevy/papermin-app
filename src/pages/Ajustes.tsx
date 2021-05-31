import { Button, Grid, Paper, TextField, Typography } from "@material-ui/core";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../context/StoreContext";
import { firestore } from "../services/firebase";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
  },
  textField: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "18rem",
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginTop: theme.spacing(4),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const Ajustes = () => {
  const classes = useStyles();
  const store = useStore();
  const [storeName, setStoreName] = useState(store?.name || "");
  const [storeSlogan, setStoreSlogan] = useState(store?.slogan || "");
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!store || storeName.length < 3 || storeSlogan.length < 3) return;
    const storeRef = firestore.collection("stores").doc(store.id);
    const newStore = {
      name: storeName,
      slogan: storeSlogan,
    };
    storeRef.set({ ...newStore });
  };
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Paper className={classes.card}>
          <Typography variant="h4" gutterBottom>
            Mi papeleria
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              className={classes.textField}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              label="Nombre"
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              value={storeSlogan}
              onChange={(e) => setStoreSlogan(e.target.value)}
              label="Slogan"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              className={classes.button}
            >
              Guardar
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Ajustes;
