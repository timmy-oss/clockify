import cn from "classnames";
import { useEffect, useState } from "react";

type LAP = {
  hStr: string;
  mStr: string;
  sStr: string;
};

export default function Stopwatch(props: {
  counter: number;
  setCounter: (arg0: number) => void;
  laps: LAP[];
  setLaps: any;
}) {
  const { counter, setCounter, laps, setLaps } = props;
  const [startCounter, setStartCounter] = useState(false);

  function reset() {
    setStartCounter(false);
    setCounter(0);
    setLaps([]);
  }

  let seconds = Math.floor(counter / 1000);

  let h = Math.floor(seconds / (60 * 60));

  let secsRemains = seconds - 60 * 60 * h;

  let m = Math.floor(secsRemains / 60);

  let secsRemains2 = secsRemains - 60 * m;

  let s = secsRemains2;

  let ms = counter - seconds * 1000;

  let hStr = String(h);
  let mStr = String(m);
  let sStr = String(s);
  let msStr = String(ms);

  if (hStr.length == 1) {
    hStr = "0" + hStr;
  }

  if (mStr.length == 1) {
    mStr = "0" + mStr;
  }

  if (sStr.length == 1) {
    sStr = "0" + sStr;
  }

  if (msStr.length == 1) {
    msStr = "0" + msStr;
  }

  function lapCounter() {
    const lapState = {
      hStr,
      mStr,
      sStr,
    };

    setLaps(laps.concat(lapState as unknown as LAP));

    setCounter(0);
  }

  function removeLap(n: number) {
    let i = 0;

    // console.log("Filtering...");
    const newLs = laps.filter((v) => {
      let r = i !== n;
      i += 1;
      return r;
    });

    setLaps(newLs);
  }

  function counterControl() {
    if (startCounter) {
      lapCounter();
    } else {
      setStartCounter(true);
    }
  }

  useEffect(() => {
    {
      function runCounter() {
        if (!startCounter) return;

        setCounter(counter + 15);
      }

      const tId: number = setInterval(runCounter, 10);

      return () => {
        clearInterval(tId);
      };
    }
  }, [counter, startCounter]);

  return (
    <>
      <div
        className={
          "w-[320px] h-[320px] lg:w-[340px] lg:h-[340px] flex flex-col justify-center items-center mx-auto mt-8 rounded-full  shadow-md border " +
          cn({
            " border-t-red-500  border-r-yellow-500 border-b-green-500 border-l-blue-500 ":
              seconds % 2 === 0,
          })
        }
      >
        <div
          className={
            "w-[305px] h-[305px]  lg:w-[325px] lg:h-[325px]  flex  flex-col justify-center items-center   rounded-full  border-4 border-dashed " +
            cn({
              " border-t-red-500  border-r-yellow-500 border-b-green-500 border-l-blue-500 ":
                false,
            })
          }
        >
          <div
            className={
              " w-[280px] h-[280px] lg:w-[300px] lg:h-[300px] border mx-auto  rounded-full shadow-md flex flex-col justify-center items-center " +
              cn({
                " border-t-red-500  border-r-yellow-500 border-b-green-500 border-l-blue-500 ":
                  seconds % 2 !== 0,
              })
            }
          >
            <h2 className="text-black tracking-wider text-center p-4 text-4xl  2xl:text-5xl">
              {h > 0 && (
                <>
                  <span> {hStr}</span>:
                </>
              )}

              {m > 0 && (
                <>
                  <span>{mStr}</span>:
                </>
              )}

              <span>{sStr} </span>
            </h2>

            <h4 className="text-white text-base bg-gray-400 rounded-full px-2 py-1 text-center relative top-6">
              <span>{msStr} </span>
            </h4>
          </div>
        </div>
      </div>

      {/* Laps */}

      <div className="flex flex-row pb-2 px-2  overflow-x-scroll no-scrollbar space-x-4 justify-between mx-auto w-[90%] pt-8 items-center">
        {laps
          .concat()
          .reverse()
          .map((l, i) => {
            return (
              <div
                key={i}
                className="flex-1 min-w-[70%] lg:min-w-[40%]  text-center relative min-h-[100px] shadow bg-white rounded-3xl"
              >
                <i
                  onClick={() => {
                    removeLap(laps.length - i - 1);
                  }}
                  className="bi-trash-fill absolute top-4 cursor-pointer hover:scale-[1.05] text-xl right-4 text-[#bebec0]"
                ></i>

                <div className="pt-4 uppercase font-bold text-lg text-black/80 tracking-wider">
                  {" "}
                  Lap {laps.length - i}
                  <h2 className="text-black font-light text-center p-2 text-xl">
                    {laps.length > 0 ? (
                      <>
                        <span> {l.hStr} </span>:<span> {l.mStr}</span>:
                        <span> {l.sStr} </span>
                      </>
                    ) : (
                      <>
                        <span> 00 </span>:<span> 00 </span>:<span> 00 </span>
                      </>
                    )}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>

      {/* Start and Resets  */}

      <div className="flex flex-row z-[2] absolute right-0 left-0 top-[80vh] text-2xl text-center space-x-4  md:space-x-8 justify-around mx-auto w-[90%] pt-8 items-center">
        <button
          onClick={counterControl}
          className={cn({
            " transition-colors w-full bg-black hover:bg-black/90 text-white uppercase flex-1 duration-300 px-6 py-6  rounded-[60px]":
              true,
          })}
        >
          {startCounter
            ? "Lap"
            : !startCounter && counter > 0
            ? "Continue"
            : "Start"}
        </button>

        <button
          onClick={reset}
          className={cn({
            " transition-colors border w-full hover:bg-[#dddeed] uppercase flex-1 bg-[#ECEEF9] duration-300 px-6 py-6 rounded-[60px]":
              true,
          })}
        >
          Reset
        </button>
      </div>
    </>
  );
}
