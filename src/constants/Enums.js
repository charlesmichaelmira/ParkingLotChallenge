export const VEHICLE_SIZE = {
  SMALL: "S",
  MEDIUM: "M",
  LARGE: "L",
};

export const PARKING_SIZE = {
  SMALL: "SP",
  MEDIUM: "MP",
  LARGE: "LP",
};

export const FIXED_RATE = 40;
export const DAY_RATE = 5000;

export const RATE_PER_HOUR = {
  SMALL: 20,
  MEDIUM: 60,
  LARGE: 100,
};

export const PARKING_LOT_MAP = [
  {
    ENTRY_POINT: "A",
    SLOTS: [
      {
        DISTANCE: 1,
        PARKING_SIZE: PARKING_SIZE.LARGE,
        STATUS: null,
      },
      {
        DISTANCE: 2,
        PARKING_SIZE: PARKING_SIZE.LARGE,
        STATUS: null,
      },
      {
        DISTANCE: 3,
        PARKING_SIZE: PARKING_SIZE.MEDIUM,
        STATUS: null,
      },
      {
        DISTANCE: 4,
        PARKING_SIZE: PARKING_SIZE.SMALL,
        STATUS: null,
      },
    ],
  },
  {
    ENTRY_POINT: "B",
    SLOTS: [
      {
        DISTANCE: 1,
        PARKING_SIZE: PARKING_SIZE.SMALL,
        STATUS: null,
      },
      {
        DISTANCE: 2,
        PARKING_SIZE: PARKING_SIZE.SMALL,
        STATUS: null,
      },
      {
        DISTANCE: 3,
        PARKING_SIZE: PARKING_SIZE.MEDIUM,
        STATUS: null,
      },
      {
        DISTANCE: 4,
        PARKING_SIZE: PARKING_SIZE.LARGE,
        STATUS: null,
      },
    ],
  },
  {
    ENTRY_POINT: "C",
    SLOTS: [
      {
        DISTANCE: 1,
        PARKING_SIZE: PARKING_SIZE.SMALL,
        STATUS: null,
      },
      {
        DISTANCE: 2,
        PARKING_SIZE: PARKING_SIZE.SMALL,
        STATUS: null,
      },
      {
        DISTANCE: 3,
        PARKING_SIZE: PARKING_SIZE.MEDIUM,
        STATUS: null,
      },
      {
        DISTANCE: 4,
        PARKING_SIZE: PARKING_SIZE.MEDIUM,
        STATUS: null,
      },
    ],
  },
];
