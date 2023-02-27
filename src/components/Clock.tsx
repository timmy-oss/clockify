import { useEffect, useState } from "react";

export default function () {
  const [dateTime, setDateTime] = useState(new Date());

  let h = "" + dateTime.getHours();
  let m = "" + dateTime.getMinutes();
  let s = "" + dateTime.getSeconds();
  let ms = "" + dateTime.getMilliseconds();

  if (h.length == 1) {
    h = "0" + h;
  }

  if (m.length == 1) {
    m = "0" + m;
  }

  if (s.length == 1) {
    s = "0" + s;
  }

  if (ms.length == 1) {
    ms = "0" + ms;
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setDateTime(new Date());
    }, 100);

    return () => {
      clearTimeout(id);
    };
  }, [dateTime]);

  return (
    <div className="mx-auto w-full mt-[150px] flex flex-row justify-center items-center">
      <div className="w-[80%] h-[325px] flex  flex-col justify-center items-center     ">
        <div className=" w-full  mx-auto  rounded-3xl  flex flex-col justify-center items-center ">
          <div className="">
            <i className="bi-clock-fill text-9xl text-black/60"></i>
          </div>

          <div className="text-black/70  flex flex-row space-x-8 text-center px-4 py-6 text-4xl  2xl:text-5xl">
            <span> {h}</span> &nbsp;: <span>{m}</span> &nbsp;:
            <span> {s} </span>
            {!(+h < 1 || +h > 11) && <span> AM </span>}
          </div>
        </div>

        <div className="w-full md:w-[80%] text-center font-bold text-sm md:text-xl text-white py-4 bg-black rounded-3xl px-4 mt-6">
          {new Date().toDateString()}
        </div>

        <div className="flex flex-row -space-x-4 ">
          <div className="w-full flex flex-row items-center justify-center animate-spin rounded mt-16 mx-auto">
            <i className="text-8xl bi-nut-fill "></i>
          </div>

          <div className="w-full flex flex-row items-center justify-center rotate-cc duration-1000  rounded mt-16 mx-auto">
            <i className="text-7xl bi-nut-fill "></i>
          </div>
        </div>
      </div>
    </div>
  );
}
