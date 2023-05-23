import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "./actionTypes";

const name = "parkingMap";
const initialState = {
  parkingMapLot: [],
};

const slice = createSlice({
  initialState,
  reducers,
  name,
});

export default slice;
