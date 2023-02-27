import cn from "classnames";
import React, { useState, useEffect } from "react";

type formStateType = {
  h: number;
  m: number;
  s: number;
};

function AddTimerForm(props: {
  closeForm: React.MouseEventHandler<HTMLButtonElement>;
  sendTimer: (formState: { h: number; m: number; s: number }) => void;
}) {
  const [formState, setFormState] = useState({ h: 0, m: 0, s: 0 });

  function updateFormState(e: React.ChangeEvent<HTMLInputElement>) {
    if (isNaN(+e.target.value) && e.target.value !== "") return;
    if (+e.target.value > 60) return;

    if (+e.target.value < 0) return;

    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }

  function addTimer(e: React.MouseEvent<HTMLButtonElement>) {
    if (!formState.h && !formState.m && !formState.s) return;
    if (formState.h === 0 && formState.m === 0 && formState.s === 0) return;

    props.sendTimer(formState);
    setFormState({ h: 0, m: 0, s: 0 });
    props.closeForm(e);
  }

  return (
    <>
      <div className="absolute top-0 right-0 left-0 bottom-0 bg-black/70"></div>
      <div className="absolute z-[2] top-8 left-0 right-0 mx-auto w-[80%] lg:w-[65%] bg-white rounded p-4 px-6 ">
        <div className="">
          <legend className="text-center py-4  text-xl  capitalize">
            Add new timer
          </legend>

          <div className="space-y-2 border flex flex-col justify-center bg-gray-200 p-2 rounded">
            <div className=" flex flex-row justify-start space-x-2 items-center ">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="00"
                value={formState.h || ""}
                onChange={updateFormState}
                name="h"
                max={60}
                className="   w-[40%]  text-center py-2 pl-4 pr-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent "
              />
              <label className="text-center px-4 "> Hours </label>
            </div>

            <div className=" flex flex-row justify-start space-x-2 items-center ">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                onChange={updateFormState}
                name="m"
                placeholder="00"
                value={formState.m || ""}
                max={60}
                className="   w-[40%]  text-center py-2 pl-4 pr-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent "
              />
              <label className="text-center px-4 "> Minutes </label>
            </div>

            <div className=" flex flex-row justify-start space-x-2 items-center ">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="00"
                onChange={updateFormState}
                name="s"
                value={formState.s || ""}
                max={60}
                className="   w-[40%]  text-center py-2 pl-4 pr-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent "
              />
              <label className="text-center px-4 "> Seconds </label>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-around pt-8 space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              onClick={addTimer}
              role="button"
              className="text-center  mx-auto hover:bg-black/90 text-xl py-3 capitalize rounded-3xl bg-black text-white  w-[90%] block "
            >
              ADD
            </button>

            <button
              onClick={props.closeForm}
              role="button"
              className="text-center mx-auto  text-xl py-3  rounded-3xl hover:bg-[#dddeed] uppercase  bg-[#ECEEF9]  text-black w-[90%] block  "
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function (props: {
  timers: Array<{
    h: number;
    m: number;
    s: number;
  }>;

  timerStates: Array<{
    id: number;
    ts: number;
  }>;

  setTimers: (arg0: any) => void;
  setTimerStates: (arg0: any) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const { timerStates, timers, setTimerStates, setTimers } = props;

  function toggleForm() {
    setShowForm(true);
    // console.log("showing...");
  }

  function hideForm() {
    setShowForm(false);
    // console.log("Hiding...");
  }

  function sendTimer(formState: { h: number; m: number; s: number }) {
    setTimers((prevState: formStateType[]) => [...prevState, formState]);

    let s = +formState.s || 0;
    let m = +formState.m || 0;
    let h = +formState.h || 0;

    // console.log(h, m, s);

    setTimerStates((prevState: formStateType[]) => [
      ...prevState,
      {
        id: timers.length,
        ts: s + m * 60 + h * 60 * 60,
      },
    ]);
  }

  function runAll() {
    const tmrs = timerStates.concat();

    for (let tmr of tmrs) {
      if (tmr.ts > 0) {
        tmr.ts -= 1;
      }
    }

    setTimerStates(tmrs);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      runAll();
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStates]);

  function removeTmr(id: number) {
    const tmrs = timerStates.concat();
    const tmrs2 = timers.concat();

    const index = tmrs.findIndex((item) => item.id === id);
    const index2 = tmrs2.findIndex((item) => item.h === id);

    if (index > -1) {
      tmrs.splice(index, 1);
      tmrs2.splice(index2, 1);
    }

    setTimerStates(tmrs);
    setTimers(tmrs2);
  }

  return (
    <div className="relative">
      {showForm && <AddTimerForm sendTimer={sendTimer} closeForm={hideForm} />}

      <div className="space-y-6 w-[90%]  mx-auto mt-8 no-scrollbar overflow-y-auto h-[70vh]  ">
        {timers.length === 0 && (
          <p className="relative top-32 text-center text-xl  px-8 text-gray-500">
            No timers added yet. Click on the button below to add a new timer.
          </p>
        )}

        {timerStates.map((item, i) => {
          let seconds = item.ts;

          let h = Math.floor(seconds / (60 * 60));

          let secsRemains = seconds - 60 * 60 * h;

          let m = Math.floor(secsRemains / 60);

          let secsRemains2 = secsRemains - 60 * m;

          let s = secsRemains2;

          let hStr = String(h);
          let mStr = String(m);
          let sStr = String(s);

          return (
            <div key={i} className={" bg-white rounded-3xl  border  "}>
              <div
                className={
                  "w-full border-2  rounded-3xl  border-dashed " +
                  cn({
                    " border-t-red-500  border-r-yellow-500 border-b-green-500 border-l-blue-500 ":
                      item.ts > 0 && item.ts % 2 == 0,
                  })
                }
              >
                <div className="w-full relative border rounded-3xl  flex flex-row items-center justify-between">
                  <i
                    onClick={() => removeTmr(item.id)}
                    className="bi-trash-fill absolute top-4 cursor-pointer hover:scale-[1.05] text-xl right-4 text-[#bebec0]"
                  ></i>
                  {/* Timer details here  */}
                  <div className=" p-4 px-6 ">
                    <h1 className=" text-gray-400"> TIMER {i + 1} </h1>
                    <div className="pt-2 text-lg text-black/80 tracking-wider">
                      <h2 className="text-black  text-left py-2 text-xl">
                        <span> {hStr} : </span> <span>{mStr} : </span>
                        <span>{sStr} </span>
                      </h2>
                    </div>
                  </div>

                  {/* Timer details here  */}

                  <div
                    className={
                      "font-bold vanish-cc bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent  text-center px-4 flex-grow text-2xl lg:text-3xl " +
                      cn({
                        " block ": item.ts === 0,
                        " hidden ": item.ts !== 0,
                      })
                    }
                  >
                    {" "}
                    <span className="">TIMER UP</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className=" text-2xl text-center  mx-auto w-[60%] pt-4 ">
        <button
          onClick={toggleForm}
          className={cn({
            " transition-colors w-full bg-black hover:bg-black/90 text-white uppercase flex-1 duration-300 px-6 py-6  rounded-[60px]":
              true,
          })}
        >
          Add
        </button>
      </div>
    </div>
  );
}
