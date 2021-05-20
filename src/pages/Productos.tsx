import { useState } from "react";
import ProductForm from "../components/ProductForm";
import { ProductType, useProducts } from "../context/ProductsContext";
import classes from "../styles/Productos.module.css";

const Productos = () => {
  const { products, addProduct, updateProduct } = useProducts();
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);

  return (
    <main>
      <h3>Productos</h3>

      <div className={classes.grid}>
        <section id="addProduct" className={classes.add}>
          <h4>Add Product</h4>
          <ProductForm
            product={null}
            handleProduct={addProduct}
            type="add"
            setEditProduct={setEditProduct}
          />
        </section>
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
        <section id="products" className={classes.products}>
          {products &&
            products.map(({ name, price }, i) => (
              <div key={i}>
                <p>
                  {name} - ${price}
                </p>
                <button onClick={() => setEditProduct(products[i])}>
                  edit
                </button>
              </div>
            ))}
        </section>
      </div>
    </main>
  );
};

export default Productos;
