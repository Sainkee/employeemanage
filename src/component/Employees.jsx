import React, { useState } from "react";
import { employees } from "../constants";
import EmpRow from "./EmpRow";

export default function Employees() {
  const [myTeam, setMyTeam] = useState([]);
  const [allEmployees, setAllEmployees] = useState(employees);

  const addToTeam = (id) => {
    const employee = allEmployees.find((emp) => emp.id === id);
    if (employee) {
      setMyTeam([...myTeam, employee]);
      setAllEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === id ? { ...emp, inTeam: true } : emp
        )
      );
    }
  };

  const calculateAverages = () => {
    const totalAge = myTeam.reduce((acc, team) => acc + team.age, 0);
    return totalAge / myTeam.length ||0;
};
  const removeFromTeam = (id) => {
    console.log(id);
    const newTeam = myTeam.filter((emp) => emp.id !== id);
    setMyTeam(newTeam);
    setAllEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, inTeam: false } : emp
      )
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-10  mt-10 w-[90%]  mx-auto  text-center">
      <div className="border-2 border-gray-700 p-2">
        <h1 className="uppercase my-2 text-black font-extrabold text-4xl">
          Employees
        </h1>
        <div className="flex flex-col gap-4 h-[70vh] overflow-scroll  p-5">
          {allEmployees.map((employee) => (
            <EmpRow
              data={employee}
              onClick={() => addToTeam(employee.id)}
              isTeam={""}
              keys={crypto.randomUUID()}
            />
          ))}
        </div>
      </div>
      <div className="border-2 border-gray-700 p-2 ">
        <h1 className="uppercase my-2 text-black font-extrabold text-4xl">
          Team
        </h1>
        <div className="flex flex-col  justify-between gap-4  h-[70vh]  p-5">
          <div className="flex flex-col gap-4 h-full overflow-scroll ">
            {myTeam.map((employee) => (
              <EmpRow
                keys={crypto.randomUUID()}
                data={employee}
                onClick={() => removeFromTeam(employee.id)}
                isTeam={true}
              />
            ))}
          </div>
          <div className="text-white  ">
            <div className="bg-slate-700 text-2xl rounded-md px-4 grid  grid-cols-2 justify-between items-center  p-2  font-bold">
              <span>Average Age</span>
              <span>{calculateAverages()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
