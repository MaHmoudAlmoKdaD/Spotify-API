
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Albums from './components/Albums';
import Search from './components/Search';



function App({isAuth}) {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route path="/callback" element={ <Search /> }/>
        <Route path="/albums/*" element={ <Albums /> }/>
      </Routes>
    </Router>
  );
}

export default App;
