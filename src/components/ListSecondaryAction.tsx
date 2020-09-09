import React from "react";
import {
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
// tslint:disable-next-line: no-submodule-imports
import DeleteIcon from "@material-ui/icons/Delete";
// tslint:disable-next-line: no-submodule-imports
import EditIcon from "@material-ui/icons/Edit";


const ListSecondaryActions = ({
  removeItem,
  openItemModal,
}: {
  removeItem: (id: any) => void;
  openItemModal: (id: any) => void;
}) => {
  return (
    <ListItemSecondaryAction>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={removeItem}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        edge="end"
        aria-label="edit"
        onClick={openItemModal}
      >
        <EditIcon />
      </IconButton>
    </ListItemSecondaryAction>
      );
};

export default ListSecondaryActions;
