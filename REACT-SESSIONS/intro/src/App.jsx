import { useState } from "react";
import Card from "./components/Card";
import Counter from "./components/Counter";
import Header from "./components/Header";
import pokemons from "./data";

function App() {
  const [theme, setTheme] = useState("light");

  const themeHandler = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <Header txt="React App" theme={theme} />

      <Counter />

      <button
        onClick={themeHandler}
        style={{ position: "fixed", right: "30px", bottom: "30px" }}
      >
        {theme === "light" ? "Dark" : "Light"}
      </button>

      {pokemons.map((pokemon) => (
        <Card
          theme={theme}
          type={pokemon.type}
          name={pokemon.name}
          key={pokemon.id}
        />
      ))}

      <p>bye bye world</p>
    </div>
  );
}

export default App;
