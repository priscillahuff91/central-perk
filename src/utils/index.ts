import { trackPromise } from "react-promise-tracker";
import { postItem, deleteItem, putItem } from "./../api";
import { Beverage, Schedule } from "./../types";

const newBeverageObj = {
  id: 0,
  name: '',
  createdByUser: 0,
};

const newScheduleObj =     {
  id: 0,
  day: '',
  userIds: [],
  beverageId: 0,
};
export const addEntity = (
    type: string,
    newEntity: any,
    existingData: any,
    setFn: (newEntity: any) => void
  ) => {
    return trackPromise(
      postItem(type, newEntity).then((d: any) => {
        setFn([...existingData, newEntity]);
      })
    );
  };

export const removeEntity = (
    type: string,
    id: number,
    existingData: any,
    setFn: (newEntity: any) => void
  ) => {
    return trackPromise(
      deleteItem(type, id).then((d: any) => {
        const filterData = existingData.filter((item: { id: number }) => {
          return item.id !== id;
        });
        setFn(filterData);
      })
    );
  };

export const updateEntity = (
    type: string,
    newEntity: any,
    existingData: any,
    setFn: (newEntity: any) => void
  ) => {
    const newData = [...existingData];
    const oldEntityIndex = newData.findIndex((e) => e.id === newEntity.id);

    if (oldEntityIndex !== -1) {
      newData[oldEntityIndex] = newEntity;
    }
    setFn(newData);
    return trackPromise(
      putItem(type, newEntity)
    );
  };

export const getCurrentBeverageDay = (schedule: Schedule[]) => {
  let day = "";
  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  const todaysBeverageDay = schedule.find((x) => {
    return x.day === day;
  });

  return todaysBeverageDay || newScheduleObj;
}

export const getCurrentBeverage = (schedule: Schedule[], beverages: Beverage[]) => {
    const todaysBeverageDay = getCurrentBeverageDay(schedule);
    const todaysBeverage = beverages.find((item) => {
      return item.id === (todaysBeverageDay ? todaysBeverageDay.beverageId : 1);
    });

    return todaysBeverage || newBeverageObj;
  };