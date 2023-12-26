import "./App.css";
import AddComponent from "./components/AddComponent";

const App = () => {
  return (
    <div>
      <section className="container">
        <div className="maincontent">
          <div className="task">
            <div className="todo">MY TASK</div>
            <img
              width="15px"
              height="15px"
              src="../public/moon-outline.svg"
              alt=""
            />
          </div>
          <div className="wrap-menu">
            <AddComponent></AddComponent>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
