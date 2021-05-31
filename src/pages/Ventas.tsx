import { useSales } from "../context/SalesContext";
import { formatDistanceToNow } from "date-fns";
import {
  Typography,
  Table,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  makeStyles,
  TableRow,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  subtitle: {
    marginLeft: theme.spacing(2),
  },
  card: {
    paddingTop: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const Ventas = () => {
  const classes = useStyles();
  const { sales } = useSales();

  return (
    <>
      <Typography variant="h4">Ventas</Typography>
      <Paper className={classes.card}>
        <Typography variant="h6" className={classes.subtitle}>
          Ultimas ventas
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales &&
              sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.id}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(sale.createdAt.toDate()), {
                      addSuffix: true,
                      includeSeconds: true,
                    })}
                  </TableCell>
                  <TableCell>{sale.products.length}</TableCell>
                  <TableCell>{sale.total}</TableCell>
                  <TableCell>
                    <Button>Ver</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default Ventas;
