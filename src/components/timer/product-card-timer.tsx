import React, { useEffect, useState } from "react";
import moment from "moment";

interface IProductCardTimerProps {
  endTime: number | string | Date;
}

const ProductCardTimer: React.FC<IProductCardTimerProps> = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>(
    moment.duration().toISOString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      const end = moment(endTime);
      const duration = moment.duration(end.diff(now));

      if (duration.asSeconds() > 0) {
        setTimeLeft(duration.toISOString());
      } else {
        clearInterval(timer);
        setTimeLeft(moment.duration().toISOString());
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (value: number, label: string) => {
    return (
      <div className="px-2 py-2 bg-transparent text-center text-white">
        <div className="leading-none text-md">
          {value.toString().padStart(2, "0")}
        </div>
        <div className=" text-xs mt-1 leading-none">{label}</div>
      </div>
    );
  };

  const days: number = moment.duration(timeLeft).days();
  const hours: number = moment.duration(timeLeft).hours();
  const minutes: number = moment.duration(timeLeft).minutes();
  const seconds: number = moment.duration(timeLeft).seconds();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between bg-black opacity-80 px-3">
        {formatTime(days, "Days")}
        {formatTime(hours, "Hrs")}
        {formatTime(minutes, "Mins")}
        {formatTime(seconds, "Secs")}
      </div>
    </div>
  );
};

export default ProductCardTimer;
