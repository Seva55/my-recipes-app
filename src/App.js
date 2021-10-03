
import React from 'react';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer'; 
import Categories from './components/categories/Categories';
import RandomMeal from './components/randomMeal/RandomMeal';
import HomePage from './components/homePage/HomePage';
import Login from './components/login/Login';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import CreateComponent from "./components/crud/Create";
import fire from './fire';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar fire={fire}/>
      <Switch>
        <Route exact path="/" component={() => <HomePage fire={fire}/>}/>
        <Route exact path="/create/:id" component={() => <CreateComponent fire={fire} />}/>
        <Route exact path="/create" component={() => <CreateComponent fire={fire} />}/>
        <Route exact path="/homePage" component={() => <HomePage fire={fire}/>}/>
        <Route exact path="/categories" component={Categories}/>
        <Route exact path="/random" component={() => <RandomMeal fire={fire}/>}/>
        <Route exact path="/login" component={() => <Login fire={fire}/>}/>
      </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;