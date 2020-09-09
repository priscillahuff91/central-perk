import React, { useState, useEffect } from "react";
import { trackPromise } from "react-promise-tracker";
import {
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { UpdateEmployee } from "./../employees/UpdateEmployee";
import { UpdateBeverage } from "./../beverages/UpdateBeverage";
import Employees from "./../employees/Employees";
import Beverages from "./../beverages/Beverage";
import Schedules from "./../schedules/Schedules";
import { BeverageOfTheDay } from "./../beverageOfTheDay";

import "./home.scss";

import { getItem } from "./../api";
import { Employee, Beverage, Schedule } from "./../types";
import { addEntity, removeEntity, updateEntity, getCurrentBeverage } from './../utils';

const Home = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [beverages, setBeverages] = useState<Beverage[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState<number | undefined>(
    undefined
  );

  const [isEmployeeOpenModal, setIsEmployeeOpenModal] = useState(false);
  const [updatingBeverageId, setUpdatingBeverageId] = useState<number | undefined>(
    undefined
  );
  const [isBeverageOpenModal, setIsBeverageOpenModal] = useState(false);
  const [isBeverageOfTheDayOpenModal, setIsBeverageOfTheDayOpenModal] = useState(false);

  useEffect(() => {
    if (!beverages.length) {
      trackPromise(getItem("beverages").then(setBeverages));
    }
  }, [beverages]);

  useEffect(() => {
    if (!employees.length) {
      trackPromise(getItem("users").then(setEmployees));
    }
  }, [employees]);

  useEffect(() => {
    if (!schedule.length) {
      trackPromise(getItem("schedule").then(setSchedule));
    }
  }, [schedule]);

  const handleClose = () => {
    setIsEmployeeOpenModal(false);
    setUpdatingEmployeeId(undefined);
    setIsBeverageOpenModal(false);
    setUpdatingBeverageId(undefined);
    setIsBeverageOfTheDayOpenModal(false);
  };

  const addEmployee = (employee: Employee) => {
    return addEntity("users", employee, employees, setEmployees);
  };

  const removeEmployee = (id: number) => {
    return removeEntity("users", id, employees, setEmployees);
  };

  const updateEmployee = (employee: Employee) => {
    return updateEntity("users", employee, employees, setEmployees);
  };

  const addBeverage = (beverage: Beverage) => {
    return addEntity("beverages", beverage, beverages, setBeverages);
  };

  const removeBeverage = (id: number) => {
    return removeEntity("beverages", id, beverages, setBeverages);
  };

  const updateBeverage = (beverage: Beverage) => {
    return updateEntity("beverages", beverage, beverages, setBeverages);
  };

  const updateSchedule = (day: Schedule) => {
    return updateEntity("schedule", day, schedule, setSchedule);
  };

  const openEmployeeModal = (employee: Employee | undefined) => {
    setIsEmployeeOpenModal(true);
    if (employee) {
      setUpdatingEmployeeId(employee.id);
    }
  };

  const openBeverageModal = (beverage: Beverage | undefined) => {
    setIsBeverageOpenModal(true);
    if (beverage) {
      setUpdatingBeverageId(beverage.id);
    }
  };

  const openBeverageOfTheDayModal = () => {
    setIsBeverageOfTheDayOpenModal(true);
  };

  return (
    <div className="container">
      <div className="heading" />
      <Grid
        className="entry-content"
        justify="center"
        container={true}
        alignItems={"center"}
      >
        <Grid xs={12} sm={9} item={true}>
          <Typography className="beverageOfDay" variant="h5" component="h5">
          Beverage of the Day:
          </Typography>
          <Typography className="beverageOfDay" variant="h2" component="h3">
            {getCurrentBeverage(schedule, beverages).name}
          </Typography>
        </Grid>
        <Grid xs={12} sm={3} item={true}>
          <Button onClick={openBeverageOfTheDayModal} color="secondary" variant="contained">
            Set Beverage of the day
          </Button>
        </Grid>
      </Grid>
      <div className="content">
        <Grid container={true}>
          <Grid lg={2} xs={12} item={true}>
            <Employees
              employees={employees}
              addEmployee={addEmployee}
              removeEmployee={removeEmployee}
              openEmployeeModal={openEmployeeModal}
            />
          </Grid>
          <Grid lg={8} xs={12} item={true}>
            <Schedules
              schedule={schedule}
              employees={employees}
              beverages={beverages}
            />
          </Grid>
          <Grid lg={2} xs={12} item={true}>
            <Beverages
              beverages={beverages}
              addBeverage={addBeverage}
              removeBeverage={removeBeverage}
              openBeverageModal={openBeverageModal}
            />
          </Grid>
        </Grid>
        <UpdateEmployee
          schedule={schedule}
          isEmployeeOpenModal={isEmployeeOpenModal}
          employee={employees.find((e) => e.id === updatingEmployeeId)}
          handleClose={handleClose}
          addEmployee={addEmployee}
          updateEmployee={updateEmployee}
          updateSchedule={updateSchedule}
          setSchedule={setSchedule}
          totalEmployees={employees.length}
        />
        <UpdateBeverage
          schedule={schedule}
          isBeverageOpenModal={isBeverageOpenModal}
          beverage={beverages.find((e) => e.id === updatingBeverageId)}
          handleClose={handleClose}
          addBeverage={addBeverage}
          updateBeverage={updateBeverage}
          setSchedule={setSchedule}
          updateSchedule={updateSchedule}
          totalBeverages={beverages.length}
        />
        <BeverageOfTheDay
          schedule={schedule}
          isBeverageOfTheDayOpenModal={isBeverageOfTheDayOpenModal}
          beverages={beverages}
          handleClose={handleClose}
          updateSchedule={updateSchedule}
        />
      </div>
    </div>
  );
};

export default Home;
