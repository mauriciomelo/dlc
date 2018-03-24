import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    minHeight: '120px',
    display: 'block',
  },

  cardRight: {
    maxWidth: '90%',
  },
  price: {
    color: green[600],
  },
  link: {
    textDecoration: 'none',
    display: 'block',
    width: '100%',
  },
};

export const Menu = props => {
  const linkTo = id => (props.linkTo ? props.linkTo(id) : '');
  return (
    <div>
      <List>
        {props.menu.map(item => (
          <ListItem key={item.id}>
            <Link className={props.classes.link} to={linkTo(item.id)}>
              <Card className={props.classes.card}>
                <CardContent>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                  >
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
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
  linkTo: PropTypes.func,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
    })
  ),
};

export default withStyles(styles)(Menu);
