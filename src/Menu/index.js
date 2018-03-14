import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';

const styles = {
  card: {
    width: '100%',
    minHeight: '120px',
    display: 'block',
  },

  cardRight: {
    maxWidth: '90%',
  },

  price: {
    color: green[600],
  },
};
export const Menu = props => (
  <div>
    <List>
      {props.menu.map(item => (
        <ListItem key={item.title}>
          <Card className={props.classes.card}>
            <CardContent>
              <Grid container justify="space-between" alignItems="flex-start">
                <Grid item className={props.classes.cardRight}>
                  <Typography variant="headline" component="h2">
                    {item.title}
                  </Typography>
                  <Typography component="p">{item.description}</Typography>
                </Grid>
                <Grid item>
                  <Typography className={props.classes.price}>
                    {item.price}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  </div>
);

export default withStyles(styles)(Menu);
