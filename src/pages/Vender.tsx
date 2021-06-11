import { useState } from "react";
import { ProductType, useProducts } from "../context/ProductsContext";
import { useSales } from "../context/SalesContext";
import type { PreSale } from "../context/SalesContext";
import { useStore } from "../context/StoreContext";

import {
  Typography,
  Button,
  Grid,
  InputLabel,
  Select,
  Card,
  CardActions,
  CardContent,
  FormControl,
  MenuItem,
  makeStyles,
  ListItem,
  List,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 250,
    marginRight: theme.spacing(2),
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
  },
}));

const Vender = () => {
  const styles = useStyles();
  const { products } = useProducts();
  const { addSale } = useSales();
  const [shoppingBag, setShoppingBag] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState("");
  const store = useStore();

  const addProductToShoppingBag = () => {
    if (!products || !selected.length) return;
    const product = products.find((p) => p.id === selected);
    if (product) {
      setShoppingBag([...shoppingBag, product]);
    }
    setSelected("");
  };

  const handlePaid = () => {
    if (!shoppingBag.length) return;
    const reducer = (accumulator: number, currentValue: ProductType) =>
      accumulator + currentValue.price;
    const presale: PreSale = {
      products: shoppingBag,
      store: store?.id || "",
      total: shoppingBag.reduce(reducer, 0),
    };
    addSale(presale);
    setShoppingBag([]);
  };

  const removeItemSelected = (index: number) => {
    shoppingBag.splice(index, 1);
    setShoppingBag([...shoppingBag]);
  };

  const clearTicket = () => {
    setShoppingBag([]);
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Vender
      </Typography>

      <Grid container spacing={3}>
        <Grid item sm={7}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Agregar productos
              </Typography>
              <div className={styles.form}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-filled-label">
                    Selecionar
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    className={styles.select}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value as string)}
                  >
                    {products &&
                      products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                          {p.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addProductToShoppingBag}
                  disableElevation
                >
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={5}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Carrito de compras
              </Typography>
              <List>
                {shoppingBag &&
                  shoppingBag.map(({ name, price }, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={name}
                        secondary={` $${price} MXN`}
                      />

                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => removeItemSelected(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
            <CardActions className={styles.actions}>
              <Button
                variant="outlined"
                color="primary"
                onClick={clearTicket}
                disableElevation
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePaid}
                disableElevation
              >
                Finalizar compra
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Vender;
