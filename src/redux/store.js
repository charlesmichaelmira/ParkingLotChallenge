import { configureStore } from "@reduxjs/toolkit";

import parkingMapReducer from "./features/parking-map/reducer";

export default configureStore({
  reducer: {
    parkingMap: parkingMapReducer,
  },
});
