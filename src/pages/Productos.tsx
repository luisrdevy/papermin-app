import { useState } from "react";
import ProductForm from "../components/ProductForm";
import { ProductType, useProducts } from "../context/ProductsContext";
import classes from "../styles/Productos.module.css";

import {
  Button,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const Productos = () => {
  const { products, addProduct, updateProduct } = useProducts();
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);


  return (
    <main>

        <section id="editProduct" className={classes.update}>
          {editProduct && (
            <>
              <h4>Edit product</h4>
              <ProductForm
                product={editProduct}
                handleProduct={updateProduct}
                type="update"
                setEditProduct={setEditProduct}
              />
            </>
          )}
        </section>

      <Container>
        <Grid container style={{padding: '3rem 1rem'}}>
          <Grid item sm={8}>

          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>codigo de barras</TableCell>
                <TableCell align="right">Producto</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Costo</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products && products.map(({ name, cost, price }, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right">{name}</TableCell>
                  <TableCell align="right">{price}</TableCell>
                  <TableCell align="right">{cost}</TableCell>
                 {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              <TableCell align="right">
              <Button variant="outlined" 
                color="primary" 
                onClick={() => setEditProduct(products[i])}>
                  Edit
                </Button>
                
              </TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
          </Grid>

            
          <Grid item sm={4} container spacing={0} direction="column" alignItems="center" justify="center">

            <section id="addProduct" className={classes.add}>
              <h4>Add Product</h4>
              <ProductForm
                product={null}
                handleProduct={addProduct}
                type="add"
                setEditProduct={setEditProduct}
              />
            </section>

            
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};

export default Productos;