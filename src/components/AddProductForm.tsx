import { Button, makeStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { ProductType, useProducts } from "../context/ProductsContext";
import { useStore } from "../context/StoreContext";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  rightButton: {
    marginRight: theme.spacing(1),
  },
}));

const AddProductForm = () => {
  const classes = useStyles();
  const { addProduct } = useProducts();
  const store = useStore();
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [proveedor, setProveedor] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [costo, setCosto] = useState<string>("");
  const clearForm = () => {
    setNombre("");
    setDescripcion("");
    setProveedor("");
    setPrecio("");
    setCosto("");
  };
  const handleSubmit = () => {
    const product: ProductType = {
      id: "invalid",
      name: nombre,
      description: descripcion,
      price: Number(precio),
      cost: Number(costo),
      provider: proveedor,
      store: store?.id ?? "x",
    };
    addProduct(product);
    clearForm();
  };

  return (
    <>
      <TextField
        className={classes.textField}
        label="Nombre"
        variant="outlined"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Descripcion"
        variant="outlined"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Proveedor"
        variant="outlined"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Precio"
        variant="outlined"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <TextField
        className={classes.textField}
        label="Costo"
        variant="outlined"
        value={costo}
        onChange={(e) => setCosto(e.target.value)}
      />
      <Button
        type="submit"
        variant="outlined"
        color="primary"
        className={classes.rightButton}
        onClick={clearForm}
      >
        Limpiar
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleSubmit}
      >
        Agregar
      </Button>
    </>
  );
};

export default AddProductForm;
