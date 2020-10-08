import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';



  const App = () => {
  const APP_ID = 'c1c23999';
  const APP_KEY = 'c4851b3d6c69d344c83310cd2cd2f7cd';

  const[recipes,setRecipes] = useState([]);
  const[search,setSearch] = useState("");
  const [query,setQuery]= useState("chicken");


  useEffect(() => {
     getRecipes();
    },[query]);

          const getRecipes = async () => {
          const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
          const data = await response.json();
          setRecipes(data.hits);
          console.log(data.hits);
    };

    const updateSearch = e => {
      setSearch(e.target.value);
    }

    const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch('');
    }
  
  return(  
    <div className="App">
        <p>Welcome to the recipe App</p>
      <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value = {search} onChange={updateSearch} />
  <button className="search_button" type="submit">Search</button>
      </form>
      <div className="Recipes">
      {recipes.map(recipe => (
       <Recipe 
       key={recipe.recipe.label} 
       title={recipe.recipe.label}
       calories={recipe.recipe.calories}
       image = {recipe.recipe.image}
       ingredients = {recipe.recipe.ingredients}
       />
      ))}
     </div>
    </div>
  );
};
export default App;
