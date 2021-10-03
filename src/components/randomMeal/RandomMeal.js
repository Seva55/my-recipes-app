import React, { useEffect, useContext } from "react";
import { myContext } from "../context/context";
import "./RandomMeal.scss";
const RandomMeal = (props) => {
  const {fire} = props;
  const [meals, setMeals] = React.useState([]);
  const [meal, setMeal] = React.useState([]);

  const fetchRandomMeal = (tmpMeals2) => {
    const mArray = tmpMeals2 || meals;
    setMeal(mArray[Math.floor(Math.random() * mArray.length)])
  }

  const asyncCall = () => {
    if (fire) {
      fire.firestore().collection('recipes').get().then((querySnapshot) => {
        const tmpMeals2 = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          tmpMeals2.push({
            idMeal: doc.id,
            title: data.title,
            strInstructions: data.description,
            strMealThumb: data.image,
          })
        });

        setMeals(tmpMeals2);
        fetchRandomMeal(tmpMeals2);
      })
    }
  }

  useEffect(() => {

    return asyncCall();
  }, [fire]);

  return (
    <div className="random">
      {meal && (
          <div key={meal.idMeal} className="random-grid">
            <div className="random-grid-controls">
              <img src={meal.strMealThumb} alt="#" />
              <div className="btn">
                <button onClick={() => fetchRandomMeal(meals)}> Generate Another Meal</button>
              </div>
            </div>

            <div className="random-grid-instructions">
              <h2>{meal.title}</h2>
              <div>
                <p>{meal.strInstructions}</p>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default RandomMeal;