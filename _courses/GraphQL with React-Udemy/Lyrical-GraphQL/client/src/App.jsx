import { Routes, Route } from "react-router-dom";
//
import SongList from "./components/SongList.jsx";
import SongCreate from "./components/SongCreate.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SongList />} />
      <Route path="/songs/new" element={<SongCreate />} />
    </Routes>
  );
}

export default App;
