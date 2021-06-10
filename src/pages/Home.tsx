import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Feature from "../components/Feature";
import SectionTitle from "../components/SectionTitle";
import classes from "../styles/Home.module.css";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  footer: {
    width: "100%",
    height: "10rem",
    background: theme.palette.primary.main,
    marginBottom: "-1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
}));
const Home = () => {
  const styles = useStyles();
  return (
    <>
      <div className={classes.hero}>
        <div className={classes.container}>
          <img src="/logo512.png" alt="Papermin" className={classes.logo} />
          <Typography variant="h2">Papermin</Typography>
          <Typography variant="h5" className={styles.button}>
            La forma más fácil de administrar tu papelería
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={styles.button}
          >
            Comenzar
          </Button>
        </div>
      </div>
      <div className={classes.imgContainer}>
        <img src="/papermin1.png" alt="Papermin" className={classes.img1} />
      </div>
      <Grid
        style={{
          margin: "2rem auto",
          width: "90%",
        }}
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <SectionTitle
            title="Caracteristicas"
            subtitle="Puedes agregar, editar y elminar tus productos de forma sencilla"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature
            src="/1.png"
            title="Controla tus inventarios"
            description={
              'Puedes agregar, editar y elminar tus productos de forma sencilla y en tiempo real, evita el robo "hormiga".'
            }
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature
            src="/2.png"
            title="Punto de venta"
            description="Atiende a tus clientes de una forma rápida y eficiente con nuestro sistema en tiempo real, compatible con códigos de barras."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature
            src="/3.png"
            title="Administra a tus vendedores"
            description="Elige a las personas que solo podrán utilizar la app para vender, sin modificar otras cuestiones."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature
            src="/4.png"
            title="Reportes"
            description="Descarga los reportes que necesites de las ventas obtenidas y evita malos entendidos."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature
            src="/5.png"
            title="Tus datos siempre seguros"
            description="Toda tu papelería está almacenada en la nube, asi evitarás cualquier perdida de información."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Feature
            src="/6.png"
            title="Ingresa desde cualquier lugar"
            description="Sin importar en dónde te encuentres y qué dispositivo utilices, Papermin siempre estará contigo 💖."
          />
        </Grid>
      </Grid>
      <footer className={styles.footer}>
        <Typography>Papermin &copy; 2021. All reserved</Typography>
      </footer>
    </>
  );
};

export default Home;
