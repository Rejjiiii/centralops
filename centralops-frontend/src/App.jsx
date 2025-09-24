import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Home } from "./pages/Home";
// import { NotFound } from "./pages/NotFound";
// import { Login } from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import { SamplePage } from "./pages/SamplePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sample" element={<SamplePage />} />
          {/* Sample route for testing Redux */}
          {/* <Route index element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
