import React from 'react'
import RecipeCard from '../Recipe/RecipeCard'
import CreateRecipe from '../PopupPage/CreateRecipe';
import axios from 'axios'
import { useContext } from 'react';
import { AppContext } from '../../App';



function Recipe() {

    const [allData, setAllData] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const searchRef = React.useRef(null);
    const [sortKey, setSortKey] = React.useState('date');
    const [ordering, setOrdering] = React.useState('asc');

    const {valueToRefresh} = useContext(AppContext);

    React.useEffect(() => {
      axios
        .get("http://localhost:3001/recipes")
        .then((response) => {
          const sortedData = response.data.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
          setAllData(sortedData);
        })
        .catch((error) => console.log(error));
    }, [valueToRefresh]);



    const handleSearch = React.useCallback((e) => {
      if (e) e.preventDefault();
        axios.get('http://localhost:3001/recipes')
        .then(res => {
            const filteredData = res.data.filter(item => 
              item.title.toLowerCase().includes(searchRef.current.value.toLowerCase()) ||
              item.description.toLowerCase().includes(searchRef.current.value.toLowerCase())
            
            );
            setAllData(filteredData);
        })
        .catch(err => console.log(err));
    }, [])


    const [diffOrd, ] = React.useState({
      'Easy': 1,
      'Medium': 2,
      'Difficult': 3
    })
    const handleSort = React.useCallback(() => {
      console.log(sortKey)
      switch (sortKey) {
        case 'date': 
          if (ordering === 'desc') {
            setAllData((prevData) => [...prevData].sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated))); 
          } else {
            setAllData((prevData) => [...prevData].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))); 
            
          }
          break; 
        case 'title': 
          if (ordering === 'desc') {
            setAllData((prevData) => [...prevData].sort((a, b) => b.title.localeCompare(a.title))); 
          } else {
            setAllData((prevData) => [...prevData].sort((a, b) => a.title.localeCompare(b.title))); 
          }
          break; 
        case 'difficulty': 
          if (ordering === 'desc') {
            setAllData((prevData) => [...prevData].sort((a, b) => diffOrd[b.difficulty] - diffOrd[a.difficulty])); 
          } else {
            setAllData((prevData) => [...prevData].sort((a, b) => diffOrd[a.difficulty] - diffOrd[b.difficulty])); 
          }
          break; 
        default: 
          break;
      }
    }, [diffOrd, sortKey, ordering]);

    React.useEffect(() => {
      handleSort();
    }, [sortKey, ordering, handleSort]);



  return (
    <>
    {isOpen &&  <CreateRecipe  setIsOpen={setIsOpen} />}
    <header className="bg-blue-700 text-white py-4 w-full shadow-md ">
      <div className='flex flex-col gap-4 md:flex-row justify-between items-center container mx-auto'>
        <div className=" px-4">
          <h1 className="text-2xl font-bold">All Recipes</h1>
        </div>
        <div>          
          <div className="w-full max-w-sm min-w-[300px]">
            <form method='get' className="relative mt-2" onSubmit={handleSearch}>
              <input
                type="text"
                className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                ref={searchRef} />
          
              <button  className="absolute right-1 top-1 rounded bg-blue-700 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-blue-800 focus:shadow-none active:bg-blue-700 hover:bg-blue-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd"></path>
                </svg>
              </button> 
            </form>   
          </div>

        </div>

        <div className='flex gap-1 items-center'>
          <h3 className='text-lg font-semibold'>Sort</h3>
        <select
          className="w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-1 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md cursor-pointer"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey} >
          <option value="date">By Date</option>
          <option value="title">By Title</option>
          <option value="difficulty">By Difficulty</option>
        </select>

        <button onClick={() => setOrdering(ordering === 'asc' ? 'desc' : 'asc')} className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded'>
          {ordering === 'asc' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
            </svg>  
          )
          }

        </button>
        </div>

        <div>
          <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Create</button>

        </div>
      </div>
    </header>


    <div className='mt-4 min-h-[calc(100vh-350px)]'>
      {allData?.length === 0 && <p className='text-center text-2xl font-semibold'>No Data Found</p>}
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