import React from 'react';
import RecipeCard from '../Recipe/RecipeCard';
import axios from 'axios';

function Home() {
  const [allData, setAllData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/recipes')
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        setAllData(sortedData.slice(0, 3));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <header className="bg-blue-700 text-white py-4 w-full shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Welcome to Recipe World!</h1>
          <p className="mt-2">Explore amazing recipes and find your next favorite dish!</p>
        </div>
      </header>

      <div className="container mx-auto px-4 my-6 min-h-[calc(100vh-350px)]">
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Featured Recipes</h2>
          <div className="flex flex-wrap justify-center gap-5">
            {allData.map((recipe) => (
              <RecipeCard key={recipe.id} data={recipe} />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">About this App</h2>
          <p>This app showcases delicious recipes and projects from our Web and Mobile 1 course.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Projects from Web and Mobile 1</h2>
          <p>During Web and Mobile 1 course we built an Auto Job Form Filler extension for chromium-based browsers. 
            <br />
            It can store predefined fields, use them on various websites, and create a cover letter for job applications.</p>
            <br />
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Links</h2>
          <a 
            href="https://github.com/HuseynJafarli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline font-semibold transition-all duration-200 ease-in-out"
          >
           GitHub page of Huseyn
          </a>
          <br />
          <br />
          <a 
            href="https://github.com/Fuad2005" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline font-semibold transition-all duration-200 ease-in-out"
          >
            GitHub page of Fuad
          </a>
          <br />
          <br />
          <a 
            href="https://github.com/Fuad2005/Auto_Form_Filler" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline font-semibold transition-all duration-200 ease-in-out"
          >
            Auto Form Filler Project Github
          </a>
        </section>
      </div>
    </>
  );
}

export default Home;
