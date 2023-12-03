import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const BasicComponent = (props) => {
  const [list, setList] = useState([]);
  function add() {
    setList((prevList) => [
      ...prevList,
      {
        value: prevList.length,
        label: "",
      },
    ]);
  }
  function deletefromlist() {
    setList((prevList) => {
      const newList = [...prevList];
      newList.pop(); // Remove the last item
      return newList;
    });
  }
  useEffect(() => {
    setList(props["list"]);
  }, [props]);
  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Kinematic deviation List
          </h1>
        </div>
      </div>

      {list &&
        list.map((e, index) => (
          <div className="px-8">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Impairment
            </label>
            <div className="mt-2">
              <input
                key={index}
                type="text"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Kinematic deviation "
                onChange={(e) => {
                  console.log(index);

                  var modifiedlist = [...list];
                  /*
                var modifiedlist = modifiedlist.map((item) => {
                  if (e.target.value == item.value) {
                    return { ...item, label: e.target.value };
                  } else {
                    return item;
                  }
                });
                */

                  modifiedlist[index]["label"] = e.target.value;
                  console.log(modifiedlist);
                  setList([...modifiedlist]);

                  props.setter({
                    ...props.json,
                    kinematic_deviations: [...modifiedlist],
                  });
                }}
                value={list[index]["label"]}
              ></input>
            </div>

            <br></br>
          </div>
        ))}

      <br></br>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={add}
        >
          Add
        </button>
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={deletefromlist}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BasicComponent;
