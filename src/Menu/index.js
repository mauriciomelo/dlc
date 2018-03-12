import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import List, { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  card: {
    width: '100%',
    minHeight: '120px',
    display: 'block',
  },
};
export const Menu = props => (
  <div>
    <List>
      {props.menu.map(item => (
        <ListItem key={item.title}>
          <Card className={props.classes.card}>
            <CardContent>
              <Typography variant="headline" component="h2">
                {item.title}
              </Typography>
              <Typography component="p">{item.description}</Typography>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  </div>
);

export default withStyles(styles)(Menu);
