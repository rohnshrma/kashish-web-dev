import { useReducer, useState } from "react";

const initialState = {
  count: 0,
};

// state transformation function => new value of state
const formReducer = (state, action) => {
  console.log("state =>", state);
  console.log("Action => ", action);

  if (action.type === "INCREMENT") {
    return {
      count: state.count + 1,
    };
  }
  if (action.type === "DECREMENT") {
    return {
      count: state.count - 1,
    };
  }
  if (action.type === "INCREASE") {
    return {
      count: state.count + action.payload,
    };
  }

  return initialState;
};

// button clicked => clickHandler => dispatch({}) => reducerFn => returns new value of state

const Counter = () => {
  const [counter, dispatch] = useReducer(formReducer, initialState);

  const incrementHandler = () => {
    dispatch({ type: "INCREMENT" });
  };
  const decrementHandler = () => {
    dispatch({ type: "DECREMENT" });
  };

  const increaseHandler = () => {
    dispatch({ type: "INCREASE", payload: 50 });
  };

  console.log(counter.count);

  return (
    <div className="counter">
      <h2>{counter.count}</h2>
      <button onClick={incrementHandler}>INCREMENT</button>
      <button onClick={decrementHandler}>DECREMENT</button>
      <button onClick={increaseHandler}>INCREASE BY 50</button>
    </div>
  );
};

export default Counter;
