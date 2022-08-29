import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Forgot from "./components/views/Forgot";

function App() {
  return (
    <>
      {/* <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={Forgot} />
          <Route path="/" component={Login} />
        </Switch>
      </Router> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
