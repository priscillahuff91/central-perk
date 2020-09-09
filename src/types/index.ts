export interface Employee {
  id: number;
  name: string;
  username: string;
};

export interface Schedule {
  id: number;
  day: string;
  userIds: number[];
  beverageId: number | null;
};

export interface Beverage {
  id: number,
  name: string,
  createdByUser: number,
};