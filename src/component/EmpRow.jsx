import React from "react";

export default function EmpRow({ keys, data, onClick, isTeam = false }) {
  return (
    <div key={keys} className="text-white">
      <span className="text-2xl bg-slate-700 rounded-md px-4 grid justify-center items-center grid-cols-3 p-2  font-bold">
        <span>{data.first_name}</span>
        <span>{data.age}</span>
        <button
          onClick={onClick}
          className="bg-blue-500 cursor-pointer disabled:bg-gray-500 px-4 py-2 rounded"
          disabled={data.inTeam}
        >
          {isTeam ? "Remove" : "Add"}
        </button>
      </span>
    </div>
  );
}
