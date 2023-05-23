/* Include these functions in the export block of 'actions.js' */

export function setParkingMap(state, action) {
  let payload = action?.payload ?? [];
  state['parkingMapLot'] = payload
}
