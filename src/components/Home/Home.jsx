import React from 'react'
import RecipeCard from '../Recipe/RecipeCard'
import axios from 'axios'

function Home() {

    const [allData, setAllData] = React.useState([]);

    React.useEffect(() => {
      axios
        .get("http://localhost:3001/recipes")
        .then((response) => setAllData(response.data))
        .catch((error) => console.log(error));
    }, []);


  return (
    <>

    <header className="bg-blue-700 text-white py-4 w-full shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">All Recipes</h1>
        </div>
    </header>



    <div className='flex flex-wrap justify-center gap-5 m-auto w-5/6 mt-4'>
    {allData?.map((recipe) => (
        <RecipeCard data={recipe} />
        
    ))}
    {/* <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard /> */}

    </div>
    </>
  )
}

export default Home