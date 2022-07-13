import { atom } from "recoil";
const dataState = atom({
  key: "dataState", // unique ID (with respect to other atoms/selectors)
  default: null, // truedefault value (aka initial value)
});

export default dataState;
