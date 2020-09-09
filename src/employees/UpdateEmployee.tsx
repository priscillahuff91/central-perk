import React, { useState, useEffect } from "react";
import {
  Dialog,
  TextField,
  FormControlLabel,
  Select,
  Paper,
  Button,
  MenuItem,
  FormControl,
  Switch,
  Input,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputLabel,
} from "@material-ui/core";
import { Employee, Schedule } from "../types";

export const UpdateEmployee = ({
  handleClose,
  employee,
  addEmployee,
  updateEmployee,
  updateSchedule,
  isEmployeeOpenModal,
  schedule,
  setSchedule,
  totalEmployees,
}: {
  employee: Employee | undefined;
  handleClose: () => void;
  schedule: Schedule[];
  addEmployee: (Employee: Employee) => Promise<any>;
  updateEmployee: (Employee: Employee) => Promise<any>;
  updateSchedule: (Schedule: Schedule) => Promise<any>;
  isEmployeeOpenModal: boolean;
  setSchedule: (schedule: Schedule[]) => void;
  totalEmployees: number;
}) => {
  const newEmployeeObj = {
    id: 0,
    name: "",
    username: "",
  };

  const [employeeObj, setEmployeeObj] = useState<Employee>(
    employee || newEmployeeObj
  );

  const [userSchedule, setUserSchedule] = useState<string[]>([]);

  useEffect(() => {
    if (employee) {
      setEmployeeObj(employee);
      const daysWorking: string[] = employee
        ? schedule.reduce((memo: string[], item: Schedule) => {
            if (item.userIds.indexOf(employee.id) !== -1) {
              memo.push(item.day);
            }
            return memo;
          }, [])
        : [];
      setUserSchedule(daysWorking);
    }
  }, [employee, schedule]);

  const onClose = () => {
    setEmployeeObj(newEmployeeObj);
    setUserSchedule([]);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setEmployeeObj({ ...employeeObj, [name]: value });
  };

  const handleChangeSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.currentTarget;

    setEmployeeObj((prevState: any) => ({ ...prevState, [name]: checked }));
  };

  const onAddEmployeeClick = () => {
    const allPromises = [];
    if (employee) {
      allPromises.push(updateEmployee(employeeObj));
    } else {
      allPromises.push(addEmployee(employeeObj));
    }

    const newSchedule = schedule.map((s: Schedule) => {
      // debugger;
      if (userSchedule.indexOf(s.day) !== -1) {
        if (s.userIds.indexOf(employeeObj.id) === -1) {
          s.userIds.push(employeeObj.id);
        }
      } else {
        s.userIds = s.userIds.filter((id) => id !== employeeObj.id);
      }
      return s;
    });
    newSchedule.forEach((s) => {
      allPromises.push(updateSchedule(s));
    });
    // update schedule in app
    setSchedule([...newSchedule]);

    // reset state
    setEmployeeObj(newEmployeeObj);

    Promise.all(allPromises).then((data) => {
      onClose();
    });
  };

  const handleChangeSelect = (e: any) => {
    const { value } = e.target;

    setUserSchedule(value);
  };

  return (
    <Dialog
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={isEmployeeOpenModal}
      onClose={onClose}
    >
      <Paper className="modal">
        <DialogTitle id="employee-form-title">Employee Form</DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true}>
            <TextField
              id="name"
              name="name"
              value={employeeObj.name}
              onChange={handleChange}
              label="Name"
            />
            <TextField
              id="username"
              name="username"
              value={employeeObj.username}
              onChange={handleChange}
              label="Username"
            />
          </FormControl>
          <FormControl fullWidth={true}>
            <InputLabel id="schedule-label">Select day(s) to work</InputLabel>
            <Select
              labelId="schedule-label"
              id="schedule"
              multiple={true}
              value={userSchedule}
              // @ts-ignore
              onChange={handleChangeSelect}
              input={<Input />}
            >
              {schedule.map((x) => (
                <MenuItem key={x.id} value={x.day}>
                  {x.day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAddEmployeeClick}>Save</Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Exit
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};
