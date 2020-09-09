import React, { useState } from "react";
import {
  Select,
  Paper,
  Button,
  FormControl,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Schedule, Beverage } from "../types";
import { getCurrentBeverageDay } from '../utils';

export const BeverageOfTheDay = ({
  handleClose,
  beverages,
  updateSchedule,
  isBeverageOfTheDayOpenModal,
  schedule,
}: {
  beverages: Beverage[] | undefined;
  handleClose: () => void;
  schedule: Schedule[];
  updateSchedule: (Schedule: Schedule) => void;
  isBeverageOfTheDayOpenModal: boolean;
}) => {
  const [updatedBeverage, setUpdatedBeverage] = useState(0);
  const handleChangeSelect = (e: any) => {
    const { value } = e.target;
    setUpdatedBeverage(JSON.parse(value));
  };

  const onAddBeverageClick = () => {
    const todaysBeverage = getCurrentBeverageDay(schedule);
    todaysBeverage.beverageId = updatedBeverage;
    updateSchedule(todaysBeverage);
    handleClose();
  };

  return (
    <Dialog 
      aria-labelledby="beverage-modal-title"
      aria-describedby="beverage-modal-description"
      open={isBeverageOfTheDayOpenModal}
      onClose={handleClose}
    >
      <Paper className="modal">
        <DialogTitle id="beverage-form-title">Beverage of the Day</DialogTitle>
        <DialogContent>
          <FormControl fullWidth={true}>
            <InputLabel id="schedule-label">Select beverage</InputLabel>
            <Select
              labelId="schedule-label"
              id="schedule"
              value={updatedBeverage}
              onChange={handleChangeSelect}
            >
            {beverages && beverages.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAddBeverageClick}>Save</Button>
          <Button onClick={() => {
            handleClose();
          }}>Exit
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};
