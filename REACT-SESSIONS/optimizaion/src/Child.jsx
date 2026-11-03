import { memo } from "react";

const Child = memo(({ name }) => {
  console.log("Child Re-rendered");
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
});

export default Child;
