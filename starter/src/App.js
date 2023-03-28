import "./App.css";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import BooksTable from "./BooksTable";

function App() {

  return (
    <Routes>
      <Route exact path="/" element={ <BooksTable/> } />
      <Route path="/search" element={ <SearchPage/> } />
    </Routes>
  );
}

export default App;
