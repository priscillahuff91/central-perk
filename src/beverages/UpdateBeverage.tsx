import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  Paper,
  Button,
  MenuItem,
  FormControl,
  Input,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  InputLabel,
} from "@material-ui/core";
import { Schedule, Beverage } from "../types";

export const UpdateBeverage = ({
  handleClose,
  beverage,
  addBeverage,
  updateBeverage,
  isBeverageOpenModal,
  schedule,
  setSchedule,
  updateSchedule,
  totalBeverages,
}: {
  beverage: Beverage | undefined;
  handleClose: () => void;
  schedule: Schedule[];
  addBeverage: (Beverage: Beverage) => void;
  updateBeverage: (Beverage: Beverage) => Promise<any>;
  updateSchedule: (Schedule: Schedule) => Promise<any>;
  isBeverageOpenModal: boolean;
  setSchedule: (schedule: Schedule[]) => void;
  totalBeverages: number;
}) => {
  const newBeverageObj = {
    id: 0,
    name: '',
    createdByUser: 0,
  };

  const [beverageObj, setBeverageObj] = useState<Beverage>(
    beverage || newBeverageObj,
  );

  const [beverageDays, setBeverageDays] = useState<string[]>([]);

  useEffect(() => {
    if (beverage) {
      setBeverageObj(beverage);
      const beverageDays: string[] = beverage
        ? schedule.reduce((memo: string[], item: Schedule) => {
            if (item.beverageId === beverage.id) {
              memo.push(item.day);
            }
            return memo;
          }, [])
        : [];
      setBeverageDays(beverageDays);
    }
  }, [beverage, schedule]);

  const onClose = () => {
    setBeverageObj(newBeverageObj);
    setBeverageDays([]);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setBeverageObj(
      { ...beverageObj, [name]: value }
    );
  };

  const handleChangeSelect = (e: any) => {
    const { value } = e.target;
    setBeverageDays(value);
  };

  const onAddBeverageClick = () => {
    const allPromises = [];

    if (beverage) {
      allPromises.push(updateBeverage(beverageObj));
    } else {
      beverageObj.id = totalBeverages + 1;
      allPromises.push(addBeverage(beverageObj));
    }

    const newSchedule = schedule.map((s: Schedule) => {
      if (beverageDays.indexOf(s.day) !== -1) {
        s.beverageId = beverageObj.id;
      } else if (s.beverageId === beverageObj.id) {
        s.beverageId = null;
      }
      return s;
    });

    newSchedule.forEach((s) => {
      allPromises.push(updateSchedule(s));
    });
    // update schedule in app
    setSchedule([...newSchedule]);

    setBeverageObj(newBeverageObj);

    Promise.all(allPromises).then(onClose);
  };

  // Modal where you can add or update a beverage
  return (
    <Dialog
      aria-labelledby="beverage-modal-title"
      aria-describedby="beverage-modal-description"
      open={isBeverageOpenModal}
      onClose={onClose}
    >
      <Paper className="modal">
        <DialogTitle id="beverage-form-title">Beverage Form</DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true}>
            <TextField
              id="name"
              name="name"
              value={beverageObj.name}
              onChange={handleChange}
              label="Name"
            />
            <br />
          </FormControl>
          <FormControl fullWidth={true}>
            <InputLabel id="schedule-label">Select day(s) to feature beverage</InputLabel>
            <Select
              labelId="schedule-label"
              id="schedule"
              multiple={true}
              value={beverageDays}
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
          <Button onClick={onAddBeverageClick}>Save</Button>
          <Button onClick={() => {
            onClose();
          }}>Exit
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};
