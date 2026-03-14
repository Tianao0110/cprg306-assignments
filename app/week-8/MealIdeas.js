"use client";
import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

async function fetchMealDetails(idMeal) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const data = await response.json();
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  const [expandedMealId, setExpandedMealId] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);

  const loadMealIdeas = async () => {
    if (ingredient) {
      const fetchedMeals = await fetchMealIdeas(ingredient);
      setMeals(fetchedMeals);
    } else {
      setMeals([]);
    }
  };

  useEffect(() => {
    loadMealIdeas();

    setExpandedMealId(null);
    setIngredientsList([]);
  }, [ingredient]);

  const handleMealClick = async (idMeal) => {
    if (expandedMealId === idMeal) {
      setExpandedMealId(null);
      setIngredientsList([]);
      return;
    }

    setExpandedMealId(idMeal);
    const details = await fetchMealDetails(idMeal);

    if (details) {
      const extractedIngredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = details[`strIngredient${i}`];
        const measure = details[`strMeasure${i}`];

        if (ing && ing.trim() !== "") {
          extractedIngredients.push(`${ing} (${measure})`);
        }
      }
      setIngredientsList(extractedIngredients);
    }
  };

  return (
    <div className="bg-stone-100 p-6 rounded-xl shadow-lg border border-slate-700 w-full ">
      <h2 className="text-2xl font-bold text-black mb-4 border-b border-slate-600 pb-2">
        Meal Ideas
      </h2>

      {!ingredient && (
        <p className="text-slate-900 italic">
          Select an item from the list to see meal ideas.
        </p>
      )}
      {ingredient && meals.length === 0 && (
        <p className="text-slate-900">
          No meal ideas found for{" "}
          <span className="text-orange-400 font-bold capitalize">
            {ingredient}
          </span>
          .
        </p>
      )}

      {ingredient && meals.length > 0 && (
        <>
          <p className="text-slate-900 mb-6">
            Here are some meal ideas using{" "}
            <span className="font-bold text-orange-400 capitalize">
              {ingredient}
            </span>
            .
            <span className="text-sm text-slate-900 ml-2">
              (Click a meal to see ingredients!)
            </span>
          </p>

          <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {meals.map((meal) => {
              const isExpanded = expandedMealId === meal.idMeal;

              return (
                <li
                  key={meal.idMeal}
                  onClick={() => handleMealClick(meal.idMeal)}
                  className="bg-white border border-gray-200 p-3 w-full rounded-xl shadow-sm hover:shadow-md hover:border-orange-400 hover:scale-[1.02] transition-all duration-500 ease-in-out cursor-pointer flex flex-col items-center text-center overflow-hidden"
                >
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-20 sm:h-24 object-cover rounded-lg mb-2 shadow-sm shrink-0"
                  />

                  <div className="flex-1 flex items-start justify-center w-full min-h-2.5rem">
                    <span
                      className="text-slate-900 font-bold text-xs sm:text-sm leading-snug line-clamp-2"
                      title={meal.strMeal}
                    >
                      {meal.strMeal}
                    </span>
                  </div>

                  <div
                    className={`w-full text-left grid transition-all duration-500 ease-in-out ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100 mt-2 pt-3 border-t border-gray-200"
                        : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-transparent"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs text-orange-500 font-bold mb-1 mt-1">
                        Ingredients:
                      </p>
                      <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 pb-1">
                        {isExpanded && ingredientsList.length === 0 ? (
                          <li className="list-none -ml-4 text-slate-400 italic">
                            Loading...
                          </li>
                        ) : (
                          ingredientsList.map((ing, index) => (
                            <li key={index}>{ing}</li>
                          ))
                        )}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
