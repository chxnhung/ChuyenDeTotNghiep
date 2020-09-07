import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import SliderProfile from "./slider";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "100%",
  },
  image: {
    width: 500,
    height: 500,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function Profile() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src="/avatar.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h2">
                  Full name: Dao Chan Hung
                </Typography>
                <Typography variant="body2" variant="h3" gutterBottom>
                  Frontend Developer
                </Typography>
                <Typography variant="body2" variant="h4" color="textSecondary">
                  Company: <a href="#">BrainOs</a>
                </Typography>
                <Typography variant="body2" variant="h4" color="textSecondary">
                  Studies at: <a href="#">HNUE</a>
                </Typography>
              </Grid>
              <Grid item>
                <SliderProfile />
              </Grid>
              <Grid item>
                <Typography variant="body2" color="textSecondary">
                  <FacebookIcon /> Facebook{" "}
                  <a href="https://www.facebook.com/chxnhung.6560">
                    Dao Chan Hung
                  </a>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <InstagramIcon /> Facebook{" "}
                  <a href="https://www.facebook.com/chxnhung.6560">chxnhung</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
