import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import HeroProfile from './pages/Hero-Profile';
import Team from './pages/Team';
import './assets/style/app.scss';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/team">
            <Team />
          </Route>

          <Route path="/hero/:id" children={<HeroProfile />} />

          <Route exact path="/:search?">
            <Home />
          </Route>

          <Route exact path="/search/:search?">
            <Home />
          </Route>

        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
