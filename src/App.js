import './App.css';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/layout/Index';
import ListState from './context/lyrics/LyricsState';

function App() {
  return (
    <ListState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ListState>
  );
}

export default App;
