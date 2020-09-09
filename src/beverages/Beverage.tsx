import React from "react";
import {
  Button,
  List,
  Typography,
  ListItem,

  ListItemText,
} from "@material-ui/core";
import { Beverage } from "../types";
import ListItemSecondaryAction from '../components/ListSecondaryAction';

const Beverages = ({
  beverages,
  addBeverage,
  removeBeverage,
  openBeverageModal,
}: {
  beverages: Beverage[];
  addBeverage: (beverage: Beverage) => void;
  openBeverageModal: (beverage: Beverage | undefined) => void;
  removeBeverage: (newEntity: any) => void;
}) => {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom={true} align="center">
      Beverages
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => openBeverageModal(undefined)}
        fullWidth={true}
      >
        Add Beverage
      </Button>
      <List dense={true} className="list-wrap">
        {beverages.map((beverage) => {
          return (
            <ListItem key={beverage.id}>
              <ListItemText
                style={{ paddingRight: "60px" }}
                primary={beverage.name}
              />
              <ListItemSecondaryAction
                removeItem={() => removeBeverage(beverage.id)}
                openItemModal={() => openBeverageModal(beverage)}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Beverages;
