
import React, { useState, useCallback, useContext } from "react";
import "./HomePage.scss";
import { myContext } from "../context/context";
import {Link} from "react-router-dom";



const HomePage = (props) => {
    const {fire} = props;
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchHomePageMeals, meals } = useContext(myContext);
  const [meals2, setMeals2] = React.useState([]);

  const fetchMealsHandler = useCallback(() => {
    fetchHomePageMeals(searchTerm);
  }, [searchTerm, fetchHomePageMeals]);

  React.useEffect(() => {
      const asyncCall = () => {
          if (fire) {
              fire.firestore().collection('recipes').get().then((querySnapshot) => {
                  const tmpMeals2 = [];
                  querySnapshot.forEach((doc) => {
                      const data = doc.data();

                      tmpMeals2.push({
                          id: doc.id,
                          title: data.title,
                          description: data.description,
                          image: data.image,
                      })
                  });

                  setMeals2(tmpMeals2);
              })
          }
      }
      return asyncCall();
  }, [fire]);

  return (
    <div className="home">
      <div className="home-search">
        <input
          type="text"
          placeholder="Type a meal name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchMealsHandler}>Search Meal</button>
      </div>

      <div className="home-grid">
        {/*{meals? (*/}
        {/*  meals.map((meal) => (*/}
        {/*    <div className="home-meal" key={meal.idMeal}>*/}
        {/*      <img src={meal.strMealThumb} alt="#" />*/}
        {/*      <h4>{meal.strMeal}</h4>*/}
        {/*    </div>*/}
        {/*  ))*/}
        {/*) : (*/}
        {/*  <h2>No meals found! Try another word...</h2>*/}
        {/*)}*/}
        {meals2? (
          meals2.map((meal) => (
              <Link to={`/create/${meal.id}`}>
            <div className="home-meal" key={meal.id}>
              <img src={meal.image} alt="#" />
              <h4>{meal.title}</h4>
                <p>{meal.description}</p>
            </div>
              </Link>
          ))
        ) : (
          <h2>No meals found! Try another word...</h2>
        )}
      </div>
    </div>
  );
};

export default HomePage;