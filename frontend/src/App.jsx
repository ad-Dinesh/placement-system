import Navbar from "./components/shared/Navbar";
import { Routes, Route } from "react-router-dom";

// Temporary pages
const Home = () => <h1 className="p-5 text-2xl">Home Page</h1>;
const Jobs = () => <h1 className="p-5 text-2xl">Jobs Page</h1>;
const Login = () => <h1 className="p-5 text-2xl">Login Page</h1>;

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;