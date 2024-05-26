import React, { useState } from "react";
import { employees } from "../constants";
import EmpRow from "./EmpRow";

export default function Employees() {
  const [myTeam, setMyTeam] = useState([]);
  const [allEmployees, setAllEmployees] = useState(employees);
  const [sortOrder, setSortOrder] = useState("asc");

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
    return totalAge / myTeam.length || 0;
  };

  const removeFromTeam = (id) => {
    const newTeam = myTeam.filter((emp) => emp.id !== id);
    setMyTeam(newTeam);
    setAllEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === id ? { ...emp, inTeam: false } : emp
      )
    );
  };

  const sortByAge = () => {
    const sortedTeam = [...myTeam].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setMyTeam(sortedTeam);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
      <div className="border-2 border-gray-700 p-2 relative">
        <h1 className="uppercase my-2 text-black font-extrabold text-4xl">
          Team
        </h1>
        {myTeam.length > 1 && (
          <span
            onClick={sortByAge}
            className="bg-pink-500 absolute right-7 top-7 text-white px-4 py-1 rounded-full cursor-pointer"
          >
            {sortOrder === "asc" ? "Sort By Age (Asc)" : "Sort By Age (Desc)"}
          </span>
        )}
        <div className="flex flex-col  justify-between gap-4  h-[70vh] ">
          <div className="flex flex-col gap-4 h-full overflow-scroll  p-5 ">
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
