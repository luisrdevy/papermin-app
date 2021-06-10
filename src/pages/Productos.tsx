import { useState } from "react";
import { ProductType, useProducts } from "../context/ProductsContext";

import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AddProductForm from "../components/AddProductForm";
import EditProductForm from "../components/EditproductForm";
import { useUser } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
  subtitle: {
    marginBottom: theme.spacing(3),
  },
  rightButton: {
    marginRight: theme.spacing(1),
  },
}));

const Productos = () => {
  const classes = useStyles();
  const { products } = useProducts();
  const { user } = useUser();
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);

  return (
    <main>
      <Grid container spacing={3}>
        <Grid item xs={12} md={user && user.displayName ? 8 : 12}>
          <TableContainer component={Paper} className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Producto</TableCell>
                  <TableCell>Descripcion</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Costo</TableCell>
                  {user && user.displayName && (
                    <TableCell align="right">Acciones</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {products &&
                  products.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.id}</TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.description}</TableCell>
                      <TableCell align="right">${p.price} MXN</TableCell>
                      <TableCell align="right">${p.cost} MXN</TableCell>
                      {user && user.displayName && (
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            color="primary"
                            className={classes.rightButton}
                          >
                            Eliminar
                          </Button>
                          <Button
                            variant="contained"
                            disableElevation
                            color="primary"
                            onClick={() => setEditProduct(p)}
                          >
                            Editar
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {user && user.displayName && (
          <Grid item xs={12} md={4}>
            <Paper className={classes.card}>
              {editProduct ? (
                <>
                  <Typography variant="h5" className={classes.subtitle}>
                    Editar producto
                  </Typography>
                  <EditProductForm
                    editProduct={editProduct}
                    setEditProduct={setEditProduct}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" className={classes.subtitle}>
                    Agregar producto
                  </Typography>
                  <AddProductForm />
                </>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </main>
  );
};

export default Productos;
