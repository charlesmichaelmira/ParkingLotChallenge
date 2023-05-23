import { VEHICLE_SIZE } from "../constants/Enums";

export const generateCar = () => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;

  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  const numeric = Math.floor(Math.random() * 9000) + 1000;
  const size = Math.floor(Math.random() * 3);
  switch (size) {
    case 0:
      return { plate: `${result} ${numeric}`, size: VEHICLE_SIZE.SMALL };
    case 1:
      return { plate: `${result} ${numeric}`, size: VEHICLE_SIZE.MEDIUM };
    case 2:
      return { plate: `${result} ${numeric}`, size: VEHICLE_SIZE.LARGE };
  }
};

export const setRandomEntryPoint = () => {
  const point = Math.floor(Math.random() * 3);
  switch (point) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
  }
};
