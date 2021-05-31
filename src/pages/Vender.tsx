import { useState } from "react";
import { ProductType, useProducts } from "../context/ProductsContext";
//import { useSales } from "../context/SalesContext";

const Vender = () => {
  const { products } = useProducts();
  //const { addSale } = useSales();
  const [shoppingBag, setShoppingBag] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState("");

  const addProductToShoppingBag = () => {
    if (!products || !selected.length) return;
    const product = products.find((p) => p.id === selected);
    if (product) {
      setShoppingBag([...shoppingBag, product]);
    }
    setSelected("");
  };

  return (
    <main>
      <p>Vender</p>
      <form>
        <div>
          <label htmlFor="">Product id</label>
          <input
            type="text"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
        </div>
        <button onClick={addProductToShoppingBag}>add</button>
      </form>
    </main>
  );
};

export default Vender;
