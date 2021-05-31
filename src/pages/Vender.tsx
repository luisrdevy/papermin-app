import { SyntheticEvent, useState } from "react";
import { ProductType, useProducts } from "../context/ProductsContext";
import { useSales } from "../context/SalesContext";
import type { PreSale } from "../context/SalesContext";
import { useStore } from "../context/StoreContext";

const Vender = () => {
  const { products } = useProducts();
  const { addSale } = useSales();
  const [shoppingBag, setShoppingBag] = useState<ProductType[]>([]);
  const [selected, setSelected] = useState("");
  const store = useStore();

  const addProductToShoppingBag = (event: SyntheticEvent) => {
    event.preventDefault();
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
  };

  return (
    <main>
      <p>Vender</p>
      <form onSubmit={addProductToShoppingBag}>
        <div>
          <label htmlFor="">Product id</label>
          <input
            type="text"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
        </div>
        <button>add</button>
      </form>
      <pre>{JSON.stringify(shoppingBag, null, 4)}</pre>
      <section>
        <button>Limpiar</button>
        <button onClick={handlePaid}>Pagar</button>
      </section>
    </main>
  );
};

export default Vender;
