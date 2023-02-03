import './App.css';
import {Routes,Route} from 'react-router-dom';
import Starter from './Starter';
import Private from './Private';


function App() {

  

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Starter/>} />
        <Route path='/private' element={<Private/>} />
      </Routes>
    </div>
  );
}

export default App;
