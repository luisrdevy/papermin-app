import jsPDF from "jspdf";
import "jspdf-autotable";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (sale, store, ticket) => {
  // initialize jsPDF
  const doc = new jsPDF();
  doc.text(`${store.name}`, 90, 15);
  doc.text(`${store.slogan}`, 90, 22);
  doc.text(`${ticket ? "Ticket de compra" : `Venta: ${sale.id}`}`, 14, 30);

  // define the columns we want and their titles
  const tableColumn = ["Producto", "Precio"];
  // define an empty array of rows
  const tableRows = [];

  // for each sale pass all its data into an array
  sale.products.forEach((product) => {
    tableRows.push([product.name, product.price]);
  });

  tableRows.push([" ", " "]);
  tableRows.push(["TOTAL $", sale.total]);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 35 });

  doc.save(`${ticket ? "ticket" : `venta-${sale.id}`}.pdf`);
};

export default generatePDF;
