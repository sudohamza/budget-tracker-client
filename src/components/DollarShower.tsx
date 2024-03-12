import { useEffect, useState } from "react";
import "./DollarShower.css";

const amounts = [5, 10, 50, 100, 500];

const getRandomSize = () => {
  return Math.random() * 0.5 + 1;
};
const getRandomAmount = () => {
  return amounts[Math.floor(Math.random() * amounts.length)];
};

const getRandomLeft = () => {
  return Math.random() * 100;
};

const getRandomSpeed = () => {
  return Math.random() * 1 + 0.75;
};

const getRandomAngle = () => {
  return Math.random() * 360;
};

const generateDollarBill = () => {
  return {
    amount: getRandomAmount(),
    size: getRandomSize(),
    speed: getRandomSpeed(),
    angle: getRandomAngle(),
    left: getRandomLeft(),
    top: -30,
  };
};

const getInitialState = () => {
  const list = new Array(6);
  return list.fill(0).map(generateDollarBill);
};

const DollarShower = () => {
  const [bills, setBills] = useState(getInitialState());
  useEffect(() => {
    const tick = () => {
      const list = bills.slice();
      list.forEach((item, index) => {
        item.top += item.speed;
        if (item.top > 100) {
          list[index] = generateDollarBill();
        }
      });
      setBills(list);
    };
    const timer = setTimeout(tick, 15);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  },);

  return (
    <div className="dollar-shower-wrapper">
      {bills.map((bill, i) => (
        <div
          key={i}
          className="dollar-bill"
          style={{
            left: `${bill.left}%`,
            top: `${bill.top}%`,
            transform: `scale(${bill.size}) rotateZ(${bill.angle}deg)`,
          }}
        >
          ${bill.amount}
        </div>
      ))}
    </div>
  );
};

export default DollarShower;
