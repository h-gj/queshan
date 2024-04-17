import logo from './logo.svg';
import './App.css';
import Table from './table';
import Zhuan from './zhuan';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Table />} />
          <Route exact path="/z" element={<Zhuan />} />
        </Routes>
      </div>
    </Router>
  );
}




// function App() {
//   return (
//     <Table />
//   );
// }

export default App;
