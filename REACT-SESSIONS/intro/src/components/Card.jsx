const Card = (props) => {
  const cssProps = {
    padding: "1rem 4rem",
    margin: "2rem",
    backgroundColor: props.theme === "light" ? "#ccc" : "#333",
    color: props.theme === "light" ? "#333" : "#fff",
  };
  return (
    <div className="card" style={cssProps}>
      <h2>{props.name}</h2>
      <h4>{props.type}</h4>
    </div>
  );
};

export default Card;
