// EmployeeDataProvider.jsx
import { createContext, useReducer, useContext } from "react";
import { employees } from "../assets/constants";
import Employee from "../components/Employee";
import Team from "../components/Team";

const EmployeeContext = createContext();

const fun = (state, action) => {
  switch (action.type) {
    case "ADD":
      return state.map((item) =>
        item.id === action.payload ? { ...item, status: !item.status } : item
      );
    default:
      return state;
  }
};



export default function EmployeeDataProvider() {
  const [state, dispatch] = useReducer(fun, employees);

  return (
    <EmployeeContext.Provider value={{ state, dispatch }}>
      <Employee />
      <Team />
    </EmployeeContext.Provider>
  );

}


