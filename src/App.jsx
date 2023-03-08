import Header from "./components/header.component/header.component";
import Dashboard from "./components/dashboard/dashboard.component";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/sign_in.component/sign_in.component";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<SignIn />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
