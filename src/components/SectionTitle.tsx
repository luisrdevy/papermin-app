import { makeStyles, Typography } from "@material-ui/core";
import { FC } from "react";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
    margin: "1rem 0",
  },
});

const SectionTitle: FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </div>
  );
};

export default SectionTitle;
