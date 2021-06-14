import jsPDF from "jspdf";
import "jspdf-autotable";
 
// define a generatePDF function that accepts a tickets argument
const generatePDF = (products, venta, namePapeleria) => {
  // initialize jsPDF
  const doc = new jsPDF();
 
  // define the columns we want and their titles
  const tableColumn = ["Producto", "Precio"];
  // define an empty array of rows
  const tableRows = [];
 
  // for each sale pass all its data into an array
  products.forEach(product => {
    const ticketData = [
      product.name,
      product.price,
    ];
    // push each products's info into a row
    tableRows.push(ticketData);
  });
  const VentaA = [" ", " "];
  tableRows.push(VentaA);

  const VentaAA = ["TOTAL $", venta.total];
  tableRows.push(VentaAA);

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 27 });

  doc.text(`${namePapeleria}`, 90, 15);
  doc.text("Ticket de compra", 14, 22);
  doc.save(`ticketCompra.pdf`);
};
 
export default generatePDF;