import { Button, makeStyles, TextField } from "@material-ui/core";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ProductType, useProducts } from "../context/ProductsContext";

type EditProductFormProps = {
  editProduct: ProductType | null;
  setEditProduct: any;
};

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  rightButton: {
    marginRight: theme.spacing(1),
  },
}));

const EditProductForm: FC<EditProductFormProps> = ({
  editProduct,
  setEditProduct,
}) => {
  const classes = useStyles();
  const { updateProduct } = useProducts();
  const [product, setProduct] = useState(editProduct as ProductType);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: name === "price" || name === "cost" ? Number(value) : value,
    });
  };
  const handleUpdateProduct = () => {
    updateProduct(product as ProductType);
    setEditProduct(null);
  };
  useEffect(() => {
    setProduct(editProduct as ProductType);
  }, [editProduct]);
  return (
    <>
      <TextField
        className={classes.textField}
        label="ID (No editable)"
        variant="outlined"
        InputProps={{
          readOnly: true,
        }}
        value={product.id}
        onChange={handleChange}
      />
      <TextField
        className={classes.textField}
        label="Nombre"
        variant="outlined"
        value={product.name}
        name="name"
        onChange={handleChange}
      />
      <TextField
        className={classes.textField}
        label="Descripcion"
        variant="outlined"
        name="description"
        value={product.description}
        onChange={handleChange}
      />
      <TextField
        className={classes.textField}
        label="Proveedor"
        variant="outlined"
        name="provider"
        value={product.provider}
        onChange={handleChange}
      />
      <TextField
        className={classes.textField}
        label="Precio"
        variant="outlined"
        name="price"
        value={product.price}
        onChange={handleChange}
      />
      <TextField
        className={classes.textField}
        label="Costo"
        variant="outlined"
        name="cost"
        value={product.cost}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setEditProduct(null)}
        className={classes.rightButton}
      >
        Cancelar
      </Button>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={handleUpdateProduct}
      >
        Guardar
      </Button>
    </>
  );
};

export default EditProductForm;
