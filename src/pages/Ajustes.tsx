import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
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
  const [vendorEmail, setVendorEmail] = useState("");
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
    storeRef.set({ ...newStore }, { merge: true });
  };
  const handleAddVendor = () => {
    if (!store) return;
    const storeRef = firestore.collection("stores").doc(store.id);
    firestore.collection("vendors").doc(vendorEmail).set({
      vendorEmail,
      storeId: store?.id,
    });
    storeRef.set({ vendors: [...store.vendors, vendorEmail] }, { merge: true });
    setVendorEmail("");
  };
  return (
    <Grid container spacing={3}>
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
      <Grid item xs={12} md={6}>
        <Paper className={classes.card}>
          <Typography variant="h4" gutterBottom>
            Mis vendedores
          </Typography>
          <section>
            <Typography variant="h6" gutterBottom>
              Agregar nuevo vendedor
            </Typography>
            <TextField
              className={classes.textField}
              label="Email"
              variant="outlined"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
            />
            <Button
              onClick={handleAddVendor}
              variant="contained"
              color="primary"
              disableElevation
            >
              Agregar
            </Button>
          </section>
          <section>
            <Typography variant="h6" gutterBottom>
              Lista de vendedores
            </Typography>
            <List>
              {store &&
                store.vendors.map((vendor) => (
                  <ListItem key={vendor}>
                    <ListItemText primary={vendor} secondary="email" />
                    <Button variant="outlined" color="primary">
                      delete
                    </Button>
                  </ListItem>
                ))}
            </List>
          </section>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Ajustes;
