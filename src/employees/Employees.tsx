import React from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
// tslint:disable-next-line: no-submodule-imports
import DeleteIcon from "@material-ui/icons/Delete";
// tslint:disable-next-line: no-submodule-imports
import EditIcon from "@material-ui/icons/Edit";
import { Employee } from "../types";
import ListItemSecondaryAction from '../components/ListSecondaryAction';

const Employees = ({
  employees,
  openEmployeeModal,
  addEmployee,
  removeEmployee,
}: {
  employees: Employee[];
  openEmployeeModal: (employee: Employee | undefined) => void;
  addEmployee: (employee: Employee) => void;
  removeEmployee: (newEntity: any) => void;
}) => {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom={true} align="center">
        Employees
      </Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => openEmployeeModal(undefined)}
        fullWidth={true}
      >
        Add Employee
      </Button>
      <List dense={true} className="list-wrap">
        {employees.map((employee) => {
          return (
            <ListItem key={employee.id} onClick={() => removeEmployee(employee.id)} className='hoverGrey'>
              <ListItemText
                primary={employee.name}
                secondary={employee.username}
              />
              <ListItemSecondaryAction
                removeItem={() => removeEmployee(employee.id)}
                openItemModal={() => openEmployeeModal(employee)}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default Employees;
