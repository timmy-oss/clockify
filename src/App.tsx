import { useState } from "react";
import cn from "classnames";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import Clock from "./components/Clock";

type LAP = {
  hStr: string;
  mStr: string;
  sStr: string;
};

function App() {
  const [activeBtn, setActiveBtn] = useState(1);

  // Stopwatch states
  const [counter, setCounter] = useState(0);
  const [laps, setLaps] = useState([] as unknown as LAP[]);

  // Timer States

  const [timers, setTimers] = useState(
    [] as unknown as Array<{
      h: number;
      m: number;
      s: number;
    }>
  );

  const [timerStates, setTimerStates] = useState(
    [] as unknown as Array<{
      id: number;
      ts: number;
    }>
  );

  function setBtn(i: number) {
    if (i > contextButtons.length - 1 || i < 0) {
      return;
    }
    setActiveBtn(i);
  }

  const contextButtons = [
    {
      name: "Timer",
      disabled: false,
    },

    {
      name: "Clock",
      disabled: false,
    },
    {
      name: "Stopwatch",
      disabled: false,
    },
  ];

  return (
    <div className=" bg-[#EEF1FB] min-h-screen fixed w-full">
      <main className="max-w-xl fixed  mx-auto top-0 botttom-0 left-0 right-0 w-full  border border-black/20 bg-[#F7F9FF] min-h-screen">
        <div className="flex flex-row mx-auto py-4 text-black/50  w-[90%] justify-around items-center">
          {contextButtons.map((btn, i) => {
            return (
              <button
                className={cn({
                  " text-black bg-[#ECEEF9]": i === activeBtn,
                  " text-black/50 hover:bg-[#ECEEF9]/70 ": i !== activeBtn,
                  " transition-colors duration-300 px-6 py-3 rounded-3xl": true,
                })}
                key={i}
                onClick={(e) => setBtn(i)}
              >
                {btn.name}
              </button>
            );
          })}
        </div>

        {/* Stopwatch  */}

        {activeBtn == 2 && (
          <Stopwatch
            counter={counter}
            setLaps={setLaps}
            laps={laps as LAP[]}
            setCounter={setCounter}
          />
        )}

        {activeBtn == 0 && (
          <Timer
            timers={timers}
            setTimers={setTimers}
            timerStates={timerStates}
            setTimerStates={setTimerStates}
          />
        )}

        {activeBtn == 1 && <Clock />}

        {/* End of stopwatch */}
      </main>
    </div>
  );
}

export default App;
