import { SyntheticEvent, useState } from "react";
import { useUser } from "../context/UserContext";
import { firestore } from "../services/firebase";

import { Paper, Typography, TextField, Button } from "@material-ui/core";
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

const CreateStore = () => {
  const classes = useStyles();
  const { user } = useUser();
  const [storeName, setStoreName] = useState("");
  const [storeSlogan, setStoreSlogan] = useState("");
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!user || storeName.length < 3 || storeSlogan.length < 3) return;
    const storeRef = firestore.collection("stores").doc(user.uid);

    const store = {
      name: storeName,
      slogan: storeSlogan,
    };
    storeRef.set({ ...store });
  };
  return (
    <>
      <Paper className={classes.card}>
        <Typography variant="h4" gutterBottom>
          Crea una papeleria
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
            Crear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default CreateStore;
