
import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Treatment from "./components/Treatment";
import { saveAs } from "file-saver";
import Kinematic_deviaiton from "./components/Kinematic_deviation";
const animatedComponents = makeAnimated();


export default function App() {
  const [impairmentview, setViewimpairment] = useState(false);
  const [treatmentview, setViewtreatment] = useState(false);
  const [kinematicview, setViewkinematic] = useState(false);

  const [jsonObject, setJsonObject] = useState(null);
  const [treatments, setTreatment] = useState(null);
  const [impairments, setImpairments] = useState(null);
  const [kinematicdeviations, setKinematicDeviations] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filename, setFilename] = useState("default");

  const downloadJsonFile = () => {
    const jsonString = JSON.stringify(jsonObject, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, `${filename}.json`);
  };
  function createimpairment() {
    var prevstate = jsonObject["impairments"];
    prevstate.push({
      impairment: "",
      kinematic_deviations: [],
      testing: "",
      category: 0,
      treatment: [],
      body: 0,
    });

    setJsonObject((prevState) => ({
      ...prevState,
      impairments: prevstate,
    }));
  }

  function deleteimpairment() {
    if (jsonObject["impairments"].length > 0) {
      var prevstate = jsonObject["impairments"];
      prevstate.pop();

      setJsonObject((prevState) => ({
        ...prevState,
        impairments: prevstate,
      }));
    } else {
      console.log("Object is empty, nothing to delete.");
    }
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFilename(file.name.split(".")[0]);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          //const parsedJson = JSON.parse(e.target.result);
          console.log(JSON.parse(e.target.result));
          var parsed = JSON.parse(e.target.result);
          setImpairments(parsed["impairments"]);
          setKinematicDeviations(parsed["kinematic_deviations"]);
          setTreatment(parsed["treatments"]);
          setJsonObject(parsed);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      };

      reader.readAsText(file);
    }
  };
  function add() {
    setJsonObject({
      treatments: [],
      kinematic_deviations: [],
      impairments: [],
    });
  }
  function reset() {
    setJsonObject(null);
  }
  function changeView(event) {
    if (event == "kinematic") {
      setViewimpairment(false);
      setViewtreatment(false);
      setViewkinematic(true);
    }
    if (event == "treatment") {
      setViewimpairment(false);
      setViewtreatment(true);
      setViewkinematic(false);
    }
    if (event == "impairment") {
      setViewimpairment(true);
      setViewtreatment(false);
      setViewkinematic(false);
    }
  }

  const handleOptionChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    );
    setSelectedOptions(selectedValues);
  };
  const tabs = [
    { name: "kinematic", href: "#", current: true },
    { name: "treatment", href: "#", current: false },
    { name: "impairment", href: "#", current: false },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="App">
      {jsonObject == null && (
        <div className="w-screen isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => {
              var file = window.prompt(
                "Please enter your prefer filename e.g swingphase_gait, if ignored it will be called default.json which can be confusing later on",
              );
              setFilename(file);
              add();
            }}
            className="w-full relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Create a new one from scratch
            </span>
          </button>
          <button
            type="button"
            className="w-full relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg>
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Import from a json file
              <br></br>
              <input type="file" onChange={handleFileChange} />
            </span>
          </button>
        </div>
      )}
      {jsonObject != null && (
        <button
          type="button"
          className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            const confirm = window.confirm(
              "Are you sure, all edits you made will not be saved if you did not export",
            );
            if (confirm) {
              reset();
            }
          }}
        >
          Reset
        </button>
      )}
      {jsonObject != null && (
        <div>
          <button
            className="rounded-full bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={downloadJsonFile}
          >
            Download JSON
          </button>
          <br></br>
          <br></br>
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={() => {
                changeView("kinematic");
              }}
              className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Kinematic Deviation
            </button>
            <button
              type="button"
              onClick={() => {
                changeView("treatment");
              }}
              className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Treatment ideas view
            </button>
            <button
              type="button"
              onClick={() => {
                changeView("impairment");
              }}
              className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Impairment view
            </button>
          </span>
          <br></br>
        </div>
      )}

      {jsonObject && kinematicview && (
        <Kinematic_deviaiton
          list={jsonObject["kinematic_deviations"]}
          json={jsonObject}
          setter={setJsonObject}
        ></Kinematic_deviaiton>
      )}
      {jsonObject && treatmentview && (
        <Treatment
          list={jsonObject["treatments"]}
          json={jsonObject}
          setter={setJsonObject}
        ></Treatment>
      )}
      {jsonObject && impairmentview && (
        <ul>
          <div>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-base font-semibold leading-6 text-gray-900">
                    Impairment list
                  </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={createimpairment}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={deleteimpairment}
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
                            Impairments
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Associated Kinematic deviations
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Testing Strageties
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Treatments
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 overflow-visible items-start">
                        {jsonObject &&
                          jsonObject["impairments"].map((e, index) => (
                            <tr key={e} className="">
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                <div className=" sm:flex sm:items-center">
                                  <div className=" h-full w-full sm:max-w-xs">
                                    <label htmlFor="email" className="sr-only">
                                      Email
                                    </label>
                                    <textarea
                                      className="resize-none h-40 w-40 "
                                      row="5"
                                      disabled={true}
                                      value={e["impairment"]}
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                                    onClick={() => {
                                      let sign = prompt(
                                        "Please edit the name of the impairment",
                                      );

                                      var modifiedlist =
                                        jsonObject["impairments"];

                                      modifiedlist[index]["impairment"] = sign;
                                      //console.log(modifiedlist);
                                      //setList([...modifiedlist]);

                                      setJsonObject({
                                        ...jsonObject,
                                        impairments: [...modifiedlist],
                                      });

                                      window.alert("successful");
                                    }}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-3 py-0 text-sm text-gray-500">
                                {e && (
                                  <div>
                                    <Select
                                      onChange={(e) => {
                                        var list = e.map((e) => {
                                          return e.value;
                                        });
                                        var newstate = jsonObject;
                                        newstate["impairments"][index][
                                          "kinematic_deviations"
                                        ] = list;
                                        setJsonObject({
                                          ...newstate, // But override this one
                                        });
                                      }}
                                      closeMenuOnSelect={false}
                                      components={animatedComponents}
                                      defaultValue={
                                        e["kinematic_deviations"] &&
                                        e["kinematic_deviations"].map((e) => {
                                          return jsonObject[
                                            "kinematic_deviations"
                                          ][e];
                                        })
                                      }
                                      isMulti
                                      options={
                                        jsonObject["kinematic_deviations"]
                                      }
                                    />
                                  </div>
                                )}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                <input
                                  type="text"
                                  disabled={true}
                                  value={
                                    jsonObject["impairments"][index]["testing"]
                                  }
                                />
                                <button
                                  type="submit"
                                  className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
                                  onClick={() => {
                                    let sign = prompt(
                                      "Please edit the name of the testing stragety",
                                    );

                                    var modifiedlist =
                                      jsonObject["impairments"];

                                    modifiedlist[index]["testing"] = sign;
                                    //console.log(modifiedlist);
                                    //setList([...modifiedlist]);

                                    setJsonObject({
                                      ...jsonObject,
                                      impairments: [...modifiedlist],
                                    });

                                    window.alert("successful");
                                  }}
                                >
                                  Edit
                                </button>
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {e && e["treatment"] && (
                                  <Select
                                    onChange={(e) => {
                                      var list = e.map((e) => {
                                        return e.value;
                                      });
                                      var newstate = jsonObject;
                                      newstate["impairments"][index][
                                        "treatment"
                                      ] = list;
                                      setJsonObject({
                                        ...newstate, // But override this one
                                      });
                                    }}
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    defaultValue={
                                      e["treatment"] &&
                                      e["treatment"].map((e) => {
                                        return jsonObject["treatments"][e];
                                      })
                                    }
                                    isMulti
                                    options={jsonObject["treatments"]}
                                  />
                                )}
                              </td>

                              <td></td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
}
