
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
import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';


function App() {


  return (
    <div className="App">
      <Router>
      <Navbar fire={fire}/>
      <Switch>
        <PublicRoute exact path="/login"  component={() => <HomePage fire={fire}/>}/>
        <PrivateRoute exact path="/create/:id"  component={() => <CreateComponent fire={fire} />}/>
        <PrivateRoute exact path="/create"  component={() => <CreateComponent fire={fire} />}/>
        <PublicRoute exact path="/homePage"  component={() => <HomePage fire={fire}/>}/>
        <PrivateRoute exact path="/categories"  component={Categories}/>
        <PrivateRoute exact path="/random"  component={() => <RandomMeal fire={fire}/>}/>
        <Route exact path="/login" component={() => <Login fire={fire}/>}/>
      </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;