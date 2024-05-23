import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Content from "./layout/content";
// import createHost from "cross-domain-storage/host";

function App() {
  // var storageHost = createHost([
  //   {
  //     origin: "https://www.stellardairies.com",
  //     allowedMethods: ["get", "set", "remove"],
  //   },
  //   {
  //     origin: "https://www.dashboard.stellardairies.com",
  //     allowedMethods: ["get"],
  //   },
  // ]);

  return (
    <div className="App">
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
