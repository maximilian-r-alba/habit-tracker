import logo from './logo.svg';
import './App.css';
import { Routes , Route } from "react-router-dom"
function App() {
  // fetch("/resolutions").then(res => res.json()).then(data => console.log(data))
  return (
    <div className="App">
      <Routes>
        <Route path = "/" element={<h1>Hello</h1>}></Route>
        <Route path = "world" element={<h1>World</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
