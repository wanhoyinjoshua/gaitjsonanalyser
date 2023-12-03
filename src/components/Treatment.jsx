import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const Treatment = (props) => {
  const [list, setList] = useState([]);
  const strengthdict = [
    { label: "not targeting strength", value: 0 },
    { label: "concentric strength", value: 1 },
    { label: "eccentric strengthening", value: 2 },
  ];

  const difficultydict = [
    { label: "beginner", value: 0 },
    { label: "intermediate", value: 1 },
    { label: "hard", value: 2 },
  ];

  useEffect(() => {
    setList(props["list"]);
  }, [props, list]);

  function add() {
    props.setter({
      ...props.json,
      treatments: [
        ...props.json["treatments"],
        {
          label: "",
          body: 0,
          level: 0,
          strength: 0,
          coordination: false,
          part: false,
          whole: false,
          rom: false,
          value: props.json["treatments"].length,
        },
      ],
    });
  }

  function minus() {
    var modifiedlist = props.json["treatments"];
    modifiedlist.pop();

    props.setter({
      ...props.json,
      treatments: [...modifiedlist],
    });
  }
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Treatment List
            </h1>
          </div>
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
              onClick={minus}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root  2 ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
            <div className="inline-block min-w-full py-2  sm:px-6 lg:px-8 ">
              <table className="min-w-full divide-y divide-gray-300 mb-60  ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Treatment name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      ROM
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Whole/part task
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Coordination
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Strength
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 overflow-visible items-start">
                  {props.json &&
                    props.json["treatments"].map((e, index) => (
                      <tr key={e} className="overflow-visible">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          <div className=" sm:flex sm:items-center">
                            <div className="w-full sm:max-w-xs">
                              <label htmlFor="email" className="sr-only">
                                Email
                              </label>
                              <input
                                key={index}
                                type="text"
                                disabled={true}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Please edit"
                                value={props.json["treatments"][index]["label"]}
                              ></input>
                            </div>
                            <button
                              type="submit"
                              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                              onClick={() => {
                                let sign = prompt(
                                  "Please edit the name of the treatment",
                                )
                                //props.json["treatments"][index]["label"];
                                var modifiedlist = [...list];

                                modifiedlist[index]["label"] = sign;
                                

                                props.setter({
                                  ...props.json,
                                  treatments: [...modifiedlist],
                                });

                                window.alert("successful");
                              }}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-0 text-sm text-gray-500">
                          <Select
                            className="overflow-visible"
                            onChange={(e) => {
                              /*
                var modifiedlist = [...list];

                modifiedlist[index]["label"] = e.target.value;
                console.log(modifiedlist);
                setList([...modifiedlist]);
                */
                              var newstate = props.json["treatments"];
                              if (e.label == "target rom") {
                                props.json["treatments"][index]["rom"] = true;

                                props.setter({
                                  ...props.json,
                                  treatments: [...list],
                                });
                              } else {
                                props.json["treatments"][index]["rom"] = false;

                                props.setter({
                                  ...props.json, // But override this one
                                });
                              }
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={
                              props.json["treatments"][index]["rom"]
                                ? { label: "target rom", value: true }
                                : { label: "does not target rom", value: false }
                            }
                            options={[
                              { label: "target rom", value: true },
                              { label: "does not target rom", value: false },
                            ]}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-0 text-sm text-gray-500">
                          <Select
                            className="overflow-visible"
                            onChange={(e) => {
                              /*
                var modifiedlist = [...list];

                modifiedlist[index]["label"] = e.target.value;
                console.log(modifiedlist);
                setList([...modifiedlist]);
                */
                              var newstate = props.json["treatments"];
                              if (e.label == "Part task") {
                                props.json["treatments"][index]["part"] = true;
                                props.json["treatments"][index][
                                  "whole"
                                ] = false;

                                props.setter({
                                  ...props.json,
                                  treatments: [...list],
                                });
                              } else {
                                props.json["treatments"][index]["part"] = false;
                                props.json["treatments"][index]["whole"] = true;
                                //list;
                                props.setter({
                                  ...props.json, // But override this one
                                });
                              }
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={
                              props.json["treatments"][index]["part"]
                                ? { label: "Part task", value: false }
                                : { label: "Whole Task", value: true }
                            }
                            options={[
                              { label: "Part task", value: false },
                              { label: "Whole Task", value: true },
                            ]}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {" "}
                          <Select
                            onChange={(e) => {
                              var newstate = props.json;
                              if (e.label == "target coordination") {
                                newstate["treatments"][index][
                                  "coordination"
                                ] = true;

                                //list;
                                props.setter({
                                  ...newstate, // But override this one
                                });
                              } else {
                                newstate["treatments"][index][
                                  "coordination"
                                ] = false;
                                //list;
                                props.setter({
                                  ...newstate, // But override this one
                                });
                              }
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={
                              props.json["treatments"][index]["coordination"]
                                ? { label: "target coordination", value: true }
                                : {
                                    label: "does not target coordination",
                                    value: false,
                                  }
                            }
                            options={[
                              { label: "target coordination", value: true },
                              {
                                label: "does not target coordination",
                                value: false,
                              },
                            ]}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Select
                            onChange={(e) => {
                              var newstate = props.json;

                              newstate["treatments"][index]["strength"] =
                                e.value;

                              props.setter({
                                ...newstate, // But override this one
                              });
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={
                              strengthdict[
                                props.json["treatments"][index]["strength"]
                              ]
                            }
                            options={strengthdict}
                          />
                        </td>

                        <td>
                          <Select
                            onChange={(e) => {
                              var newstate = props.json;
                              newstate["treatments"][index]["level"] = e.value;

                              props.setter({
                                ...newstate, // But override this one
                              });
                            }}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={
                              difficultydict[
                                props.json["treatments"][index]["level"]
                              ]
                            }
                            options={difficultydict}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treatment;
