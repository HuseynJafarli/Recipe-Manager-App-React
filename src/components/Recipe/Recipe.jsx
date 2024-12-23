import React from 'react'
import RecipeCard from '../Recipe/RecipeCard'
import CreateRecipe from '../PopupPage/CreateRecipe';
import axios from 'axios'


function Recipe() {

    const [allData, setAllData] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
      axios
        .get("http://localhost:3001/recipes")
        .then((response) => setAllData(response.data))
        .catch((error) => console.log(error));
    }, []);


  return (
    <>
    {isOpen &&  <CreateRecipe  setIsOpen={setIsOpen} />}
    <header className="bg-blue-700 text-white py-4 w-full shadow-md ">
      <div className='flex justify-between container mx-auto'>
        <div className=" px-4">
          <h1 className="text-2xl font-bold">All Recipes</h1>
        </div>
        <div>
          <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Create</button>

        </div>
      </div>
    </header>


    <div className='mt-4 min-h-[calc(100vh-350px)]'>
      <div className='flex flex-wrap justify-center gap-5 m-auto w-5/6 '>
      {allData?.map((recipe) => (
          <RecipeCard key={recipe.id} data={recipe} />
          
      ))}
      </div>

    </div>
    </>
  )
}

export default Recipe