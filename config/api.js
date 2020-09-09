module.exports = () => ({
  beverages: [
    {
      id: 1,
      name: 'Nitro Cold Brew',
      createdByUser: 1,
    },
    {
      id: 2,
      name: 'Caramel Machiatto',
      createdByUser: 1,
    },
    {
      id: 3,
      name: 'Pumpkin Spice Latte',
      createdByUser: 1,
    },
    {
      id: 4,
      name: 'Espresso',
      createdByUser: 1,
    },
    {
      id: 5,
      name: 'Iced Soy Chai Latte',
      createdByUser: 1,
    },
    {
      id: 6,
      name: 'Passion Tea Lemonade',
      createdByUser: 1,
    }
  ],
  schedule: [
    {
      id: 1,
      day: 'Sunday',
      userIds: [1],
      beverageId: 1
    },
    {
      id: 2,
      day: 'Monday',
      userIds: [1, 2],
      beverageId: 1
    },
    {
      id: 3,
      day: 'Tuesday',
      userIds: [1],
      beverageId: 2
    },
    {
      id: 4,
      day: 'Wednesday',
      userIds: [1, 2, 3],
      beverageId: 3
    },
    {
      id: 5,
      day: 'Thursday',
      userIds: [1, 2],
      beverageId: 4
    },
    {
      id: 6,
      day: 'Friday',
      userIds: [1, 2 , 3],
      beverageId: 5
    },
    {
      id: 7,
      day: 'Saturday',
      userIds: [1, 2 , 3],
      beverageId: 3
    },
  ],
  users: [
    {
      id: 1,
      name: 'Rachel',
      username: 'rach_greene'
    },
    {
      id: 2,
      name: 'Gunther',
      username: 'Blondiexx'
    },
    {
      id: 3,
      name: 'Rick',
      username: 'rIcK055'
    },
    {
      id: 4,
      name: 'Pheobe',
      username: 'smellycat'
    }
  ]
});
