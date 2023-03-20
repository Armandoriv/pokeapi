import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import PokemonPage from "./pages/PokemonPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PokemonProvider from "./context/PokemonProvider";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <PokemonProvider>
      <Navbar/>
        <Routes>
          <Route index element={<HomePage/>}/>
          <Route path="pokemon/:id" element={<PokemonPage/>}/>
          <Route path="search" element={<SearchPage/>}/>
          <Route path="*" element={<Navigate to='/'/>}/>
        </Routes>

      </PokemonProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
