const Header = (props) => {
  const cssProps = {
    padding: "2rem 4rem",
    backgroundColor: props.theme === "light" ? "#ccc" : "#333",
    color: props.theme === "light" ? "#333" : "#fff",
  };

  return (
    <div style={cssProps} className="header">
      <h1>{props.txt}</h1>
    </div>
  );
};

export default Header;
