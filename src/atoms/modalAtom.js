import { atom } from "recoil";
const openState = atom({
  key: "openState", // unique ID (with respect to other atoms/selectors)
  default: false, // truedefault value (aka initial value)
});
export default openState;
