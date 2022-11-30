import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import ComposeEmail from "./pages/composeEmail";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <div className='my-10 mx-10'>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/compose' element={<ComposeEmail />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
