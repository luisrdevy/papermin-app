import { useSales } from "../context/SalesContext";
import { formatDistanceToNow } from "date-fns";

const Ventas = () => {
  const { sales } = useSales();
  return (
    <main>
      <h1>Ventas</h1>
      <h3>Ultimas ventas</h3>
      <section>
        {sales &&
          sales.map((sale) => (
            <tr>
              <td>{sale.id}</td>
              <td>
                {formatDistanceToNow(new Date(sale.createdAt as any), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </td>
              <td>
                {sale.products.map((prod) => (
                  <span>{prod.name}</span>
                ))}
              </td>
              <td>{sale.total}</td>
            </tr>
          ))}
      </section>
    </main>
  );
};

export default Ventas;
