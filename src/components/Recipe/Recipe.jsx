import React from 'react'
import RecipeCard from '../Recipe/RecipeCard'
import CreateRecipe from '../PopupPage/CreateRecipe';
import axios from 'axios'
import { useContext } from 'react';
import { AppContext } from '../../App';

import Select from 'react-select';




function Recipe() {

  const [allData, setAllData] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const searchRef = React.useRef(null);
  const [sortKey, setSortKey] = React.useState('date');
  const [ordering, setOrdering] = React.useState('asc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage,] = React.useState(6);
  const [allTags, setAllTags] = React.useState({});
  const [selectedTags, setSelectedTags] = React.useState([]);
  const [selectedDiff, setSelectedDiff] = React.useState({value: 'all', label: 'All'});
  const [isFiltered, setIsFiltered] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const { valueToRefresh } = useContext(AppContext);
  const [totalPages, setTotalPages] = React.useState(0);
  const [selectedRecipes, setSelectedRecipes] = React.useState([]);

  const toggleRecipeSelection = (recipe) => {
    setSelectedRecipes((prev) =>
      prev.some((r) => r.id === recipe.id)
        ? prev.filter((r) => r.id !== recipe.id)
        : [...prev, recipe]
    );
  };
  

  React.useEffect(() => {
    console.log(selectedRecipes);
  }, [selectedRecipes]);

  const handleShare = () => {
    if (selectedRecipes.length === 0) {
      alert("Please select at least one recipe to share.");
      return;
    }

    const jsonData = JSON.stringify(selectedRecipes, null, 2);

    // Version 1
    // const mailtoLink = `mailto:?subject=Selected Recipes&body=${encodeURIComponent(
    //   `Here are the selected recipes in JSON format:\n\n${jsonData}`
    // )}`;

    // if (mailtoLink.length > 20000) {
      // If too large, fallback to download
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "recipes.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("Data too large for email. JSON file downloaded instead.");
    // }
  };


  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    if (isFiltered) {
      return filteredData.slice(startIndex, endIndex);
    }
    else {
      return allData.slice(startIndex, endIndex);
    }
  };

  React.useEffect(() => {
    if (isFiltered) {
      setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
    } else {
      setTotalPages(Math.ceil(allData.length / itemsPerPage));
    }
  }, [isFiltered, allData, filteredData, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:3001/recipes")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        setAllData(sortedData);
        const allTags = [...new Set(sortedData.flatMap(item => item.tags))];
        const options = allTags.map(tag => ({ value: tag.toLowerCase(), label: tag }));
        setAllTags(options);
      })
      .catch((error) => console.log(error));
  }, [valueToRefresh]);



  const handleSearch = React.useCallback((e) => {
    if (e) e.preventDefault();
    axios.get('http://localhost:3001/recipes')
      .then(res => {
        const searchedData = res.data.filter(item =>
          item.title.toLowerCase().includes(searchRef.current.value.toLowerCase()) ||
          item.description.toLowerCase().includes(searchRef.current.value.toLowerCase())

        );
        if (isFiltered) {
          setFilteredData(searchedData)
        } else setAllData(searchedData);

      })
      .catch(err => console.log(err));
  }, [isFiltered])


  const [diffOrd,] = React.useState({
    'Easy': 1,
    'Medium': 2,
    'Difficult': 3
  })
  const handleSort = React.useCallback(() => {
    if (isFiltered) {
      switch (sortKey) {
        case 'date':
          if (ordering === 'desc') {
            setFilteredData((prevData) => [...prevData].sort((a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated)));
          } else {
            setFilteredData((prevData) => [...prevData].sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)));

          }
          break;
        case 'title':
          if (ordering === 'desc') {
            setFilteredData((prevData) => [...prevData].sort((a, b) => b.title.localeCompare(a.title)));
          } else {
            setFilteredData((prevData) => [...prevData].sort((a, b) => a.title.localeCompare(b.title)));
          }
          break;
        case 'difficulty':
          if (ordering === 'desc') {
            setFilteredData((prevData) => [...prevData].sort((a, b) => diffOrd[b.difficulty] - diffOrd[a.difficulty]));
          } else {
            setFilteredData((prevData) => [...prevData].sort((a, b) => diffOrd[a.difficulty] - diffOrd[b.difficulty]));
          }
          break;
        default:
          break;
      }
    }
    else {
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
    }


  }, [diffOrd, sortKey, ordering]);

  React.useEffect(() => {
    handleSort();
  }, [sortKey, ordering, handleSort]);

  const handleTagFilter = (selected) => {
    setSelectedTags(selected);
    if (selected.length !== 0) {
      setFilteredData(allData.filter(item => selected.every(tag => item.tags.includes(tag.label))));
      setIsFiltered(true)
    } else {
      setIsFiltered(false)
    }
  };

  const handleDiffFilter = (selected) => {
    setSelectedDiff(selected);
    if (selected) {
      if (selected.label === 'All') {
        setFilteredData(allData);
        return
      }
      setFilteredData(allData.filter(item => item.difficulty === selected.label));
      setIsFiltered(true)
    } else {
      setIsFiltered(false)
    }
  };


  return (
    <>
      {isOpen && <CreateRecipe setIsOpen={setIsOpen} />}
      <header className="bg-blue-700 text-white py-4 w-full shadow-md ">
          <div className="text-center pb-4">
            <h1 className="text-2xl font-bold">All Recipes</h1>
          </div>
        <div className='flex flex-col gap-4 lg:flex-row justify-between items-center container mx-auto'>
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

                <button className="absolute right-1 top-1 rounded bg-blue-700 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-blue-800 focus:shadow-none active:bg-blue-700 hover:bg-blue-800 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
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
                  <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                </svg>
              )
              }

            </button>
          </div>

          <div className='flex gap-1 items-center'>
            <h3 className='text-lg font-semibold'>Tag: </h3>
            <Select isMulti options={allTags} value={selectedTags} onChange={handleTagFilter} placeholder="Select tags" classNamePrefix="my-multi-select" className='text-black max-w-[400px]' />
            <h3 className='text-lg font-semibold ml-4'>Difficulty: </h3>
            <Select options={[{value: 'all', label: 'All'} ,{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'difficult', label: 'Difficult' }]} defaultValue={{value: 'all', label: 'All'}} value={selectedDiff} onChange={handleDiffFilter} placeholder="Select difficulty" classNamePrefix="my-multi-select" className='text-black max-w-[400px]' />
          </div>

          <div className='flex gap-2'>
            <button onClick={() => setIsOpen(true)} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Create</button>
            <button onClick={handleShare} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>Share</button>
          </div>
        </div>
      </header>


      <div className='mt-4 min-h-[calc(100vh-350px)]'>
        {allData?.length === 0 && <p className='text-center text-2xl font-semibold'>No Data Found</p>}
        <div className='flex flex-wrap justify-center gap-5 m-auto w-5/6 '>
          {getPaginatedData()?.map((recipe) => (
            <RecipeCard key={recipe.id} data={recipe} isSelected={selectedRecipes.includes(recipe)} onSelect={toggleRecipeSelection} />
          ))}

        </div>

      </div>

      {/* Pagination */}
      <div className="pagination mt-4 flex justify-center items-center ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <ul className="flex items-center m-0 p-0">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
            <li key={page} className="list-none mx-0.1">
              <button
                onClick={() => handlePageChange(page)}
                className={`flex items-center justify-center px-4 h-8 leading-tight border ${currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                  }`}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

    </>
  )
}

export default Recipe