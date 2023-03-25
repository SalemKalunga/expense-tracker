import Header from "./components/header.component/header.component";
import Dashboard from "./components/dashboard/dashboard.component";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/sign_in.component/sign_in.component";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./store/user/user.actions";
import { useEffect } from "react";
import { onAuthStateChangedListener } from "./utils/firebase";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChangedListener((user) => {
      dispatch(setCurrentUser(user));
    });
  }, [dispatch]);

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
