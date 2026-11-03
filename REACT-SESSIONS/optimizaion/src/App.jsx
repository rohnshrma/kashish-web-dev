import { useState } from "react";
import Child from "./Child";

const App = () => {
  console.log("App Re-rendered");
  const [count, setCount] = useState(0);
  return (
    <div>
      <Child name={"john doe"} />
      <button onClick={() => setCount(count + 1)}>INCREASE</button>
    </div>
  );
};

export default App;
