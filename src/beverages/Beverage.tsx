import React from "react";
import {
  Button,
  List,
  Typography,
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
} from "@material-ui/core";
// tslint:disable-next-line: no-submodule-imports
import DeleteIcon from "@material-ui/icons/Delete";
// tslint:disable-next-line: no-submodule-imports
import EditIcon from "@material-ui/icons/Edit";
import { Beverage } from "../types";

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
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeBeverage(beverage.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => openBeverageModal(beverage)}
                >
                  <EditIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Beverages;
