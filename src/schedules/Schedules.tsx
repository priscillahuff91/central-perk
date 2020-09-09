import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from "@material-ui/core";

import { Schedule, Employee, Beverage } from "../types";
import "./schedule.scss";

const Schedules = ({
  employees,
  beverages,
  schedule,
}: {
  employees: Employee[];
  beverages: Beverage[];
  schedule: Schedule[];
}) => {
  const getEmployees = (userIds: number[]) => {
    const employeesClone = employees.slice(0);
    const employeesPerDay = employeesClone.filter((employee) => {
      return userIds.some((userId) => {
        return userId === employee.id;
      });
    });

    return (
      <List dense={true} className="employeeList">
        {employeesPerDay.length &&
          employeesPerDay.map((employee) => {
            return (
              <ListItem key={employee.id} disableGutters={true}>
                <ListItemText primary={employee.name} />
              </ListItem>
            );
          })}
      </List>
    );
  };

  const getBeverage = (beverageId: number) => {
    const beveragePerDay = beverages.find((beverage) => {
      return beverage.id === beverageId;
    });
    return <div>{beveragePerDay && beveragePerDay.name}</div>;
  };

  return (
    <div className="schedule">
      <Grid container={true} alignItems="stretch">
        {schedule.map((day) => {
          return (
            <Grid key={day.id} xs={1} item={true} className="grid-schedule">
              <Typography variant="h6" component={"h6"} color="primary">
                {day.day}
              </Typography>
              {day.beverageId && (
                <Typography
                  component={"span"}
                  variant="caption"
                  color="textSecondary"
                >
                  {getBeverage(day.beverageId)}
                </Typography>
              )}
              <Typography variant="body1" component={"div"}>
                {day.userIds && getEmployees(day.userIds)}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Schedules;
