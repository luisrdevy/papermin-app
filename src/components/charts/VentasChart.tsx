import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory";
import { useSales } from "../../context/SalesContext";

const VentasChart = () => {
  const { sales } = useSales();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!sales) return;

    const hash = new Map();
    sales.forEach((s) => {
      const d = s.createdAt.toDate();
      const key = `${d.getMonth()}${d.getDay()}`;

      let val = s.total;
      if (hash.has(key)) {
        val += hash.get(key);
      }
      hash.set(key, val);
    });
    const newData = [];
    hash.forEach((val, key) => {
      newData.push({ x: Number(key), y: val });
    });

    setData(newData.sort((a, b) => a - b));
  }, [sales]);
  return (
    <>
      <VictoryChart
        height={250}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
      >
        <VictoryLine
          data={data}
          interpolation="monotoneX"
          style={{ data: { stroke: "#20232a" } }}
        />
        <VictoryScatter
          data={data}
          size={5}
          style={{ data: { fill: "#20232a" } }}
        />
      </VictoryChart>
    </>
  );
};

export default VentasChart;
