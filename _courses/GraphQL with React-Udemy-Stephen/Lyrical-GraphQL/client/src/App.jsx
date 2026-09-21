import { Routes, Route } from "react-router-dom";
//
import SongList from "./components/SongList.jsx";
import SongCreate from "./components/SongCreate.jsx";
import SongDetail from "./components/SongDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SongList />} />
      <Route path="/songs/new" element={<SongCreate />} />
      <Route path="/songs/:id" element={<SongDetail />} />
    </Routes>
  );
}

export default App;
