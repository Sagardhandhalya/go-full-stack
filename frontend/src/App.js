import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import CardView from './pages/CardView/CardView';
import GraphView from './pages/GraphView/GraphView';


function App() {
  return (
    <div className="App">

    <Router>
      <NavBar />
      <Switch>
        <Route path="/g" component={GraphView} />
        <Route path="/" component={CardView} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
