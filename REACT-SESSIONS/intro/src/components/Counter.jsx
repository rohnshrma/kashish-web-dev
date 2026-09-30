import { useState } from "react";

const Counter = () => {
  let [count, setCount] = useState(0);

  const clickHandler = () => {
    setCount(count + 1); // new value
  };
  console.log(count);

  return (
    <div className="counter">
      <h2>{count}</h2>
      <button onClick={clickHandler}>INCREMENT</button>
    </div>
  );
};

export default Counter;
