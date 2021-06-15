import { useEffect, useState } from "react";
import { VictoryPie } from "victory";
import { useSales } from "../../context/SalesContext";

const ProductoChart = () => {
  const { sales } = useSales();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!sales) return;

    const hash = {};
    sales.forEach((sale) => {
      sale.products.forEach(({ id, name }) => {
        if (hash[id]) {
          const { y } = hash[id];
          hash[id] = { ...hash[id], y: y + 1 };
        } else {
          hash[id] = { label: name, y: 1 };
        }
      });
    });
    const productsData = [];

    for (let key in hash) {
      productsData.push({
        y: hash[key].y,
        label: `${hash[key].label} (${hash[key].y})`,
        x: productsData.length + 1,
      });
    }

    productsData.sort((a, b) => b.y - a.y);
    productsData.splice(4);

    setData(productsData);
  }, [sales]);
  return (
    <>
      <VictoryPie
        innerRadius={40}
        data={data}
        height={220}
        style={{
          labels: { fill: "#20232a", fontSize: 10, fontWeight: "bold" },
        }}
      />
    </>
  );
};

export default ProductoChart;
