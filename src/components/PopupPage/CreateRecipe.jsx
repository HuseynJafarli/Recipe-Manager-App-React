import React from 'react'
import axios from 'axios';
function CreateRecipe({setIsOpen}) {

    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        tags: [],
        ingredients: [],
        preparation: [],
        difficulty: '',
    });

    const createRecipeHandler = React.useCallback(() => {
        axios.post('http://localhost:3001/recipes', formData)
          .then((response) => {
            console.log('Recipe created:', response.data);
            setIsOpen(false)
          })
          .catch((error) => {
            console.error('Error creating recipe:', error);
          });
    }, [formData, setIsOpen]);


    const handleAllInputChange = React.useCallback((e) => {
        const { name, value } = e.target;
      
        setFormData((prevFormData) => {
          const newFormData = { ...prevFormData };
      
          if (name === 'title') {
            newFormData.title = value;
          }
          if (name === 'description') {
            newFormData.description = value;
          }
          if (name === 'difficulty') {
            newFormData.difficulty = value;
          }
          if (name.startsWith('tag')) {
            const index = parseInt(name.split('-')[1], 10);
            const newTags = [...newFormData.tags];
            if (index < newTags.length) {
              newTags[index] = value;
            } else if (value.trim() !== '') {
              newTags.push(value);
            }
            newFormData.tags = newTags;
          }
          if (name.startsWith('ingredient')) {
            const index = parseInt(name.split('-')[1], 10);
            const newIngredients = [...newFormData.ingredients];
            if (index < newIngredients.length) {
              newIngredients[index] = value;
            } else if (value.trim() !== '') {
              newIngredients.push(value);
            }
            newFormData.ingredients = newIngredients;
          }
          if (name.startsWith('prepStep')) {
            const index = parseInt(name.split('-')[1], 10);
            const newPrepSteps = [...newFormData.preparation];
            if (index < newPrepSteps.length) {
              newPrepSteps[index] = value;
            } else if (value.trim() !== '') {
              newPrepSteps.push(value);
            }
            newFormData.preparation = newPrepSteps;
          }
      
          return newFormData;
        });
      }, []);
      


    const createTagInput = React.useCallback(() => {
        const parentContainer = document.querySelector('.tags');
        const id = parentContainer.children.length;
        const tagInputContainer = document.createElement('div');
        tagInputContainer.className = 'flex gap-2';
        tagInputContainer.id = `tagDiv-${id}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `tag-${id}`;
        input.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5';
        input.placeholder = 'Enter tag';
        input.required = true;
        input.addEventListener('input', handleAllInputChange);

        const removeButton = document.createElement('button');
        removeButton.id = `removet-${id}`;
        removeButton.className = 'bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg';

        const svgHtml = `
            <svg width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        `;

        removeButton.innerHTML = svgHtml;
        tagInputContainer.appendChild(input);
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            parentContainer.removeChild(tagInputContainer);
        });
        tagInputContainer.appendChild(removeButton);

        parentContainer.appendChild(tagInputContainer);
      }, []);


    const createIngredientInput = React.useCallback(() => {
        const parentContainer = document.querySelector('.ingredients');
        const id = parentContainer.children.length;
        const tagInputContainer = document.createElement('div');
        tagInputContainer.className = 'flex gap-2';
        tagInputContainer.id = `ingredientDiv-${id}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `ingredient-${id}`;
        input.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5';
        input.placeholder = 'Enter ingredient';
        input.required = true;
        input.addEventListener('input', handleAllInputChange);


        const removeButton = document.createElement('button');
        removeButton.id = `removei-${id}`;
        removeButton.className = 'bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg';

        const svgHtml = `
            <svg width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        `;

        removeButton.innerHTML = svgHtml;
        tagInputContainer.appendChild(input);
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            parentContainer.removeChild(tagInputContainer);
        });
        tagInputContainer.appendChild(removeButton);

        parentContainer.appendChild(tagInputContainer);
      }, []);

      
    const createPrepInput = React.useCallback(() => {
        const parentContainer = document.querySelector('.prepSteps');
        const id = parentContainer.children.length;
        const tagInputContainer = document.createElement('div');
        tagInputContainer.className = 'flex gap-2';
        tagInputContainer.id = `prepStepsDiv-${id}`;

        const input = document.createElement('input');
        input.type = 'text';
        input.name = `prepStep-${id}`;
        input.className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5';
        input.placeholder = 'Enter step';
        input.required = true;
        input.addEventListener('input', handleAllInputChange);


        const removeButton = document.createElement('button');
        removeButton.id = `removep-${id}`;
        removeButton.className = 'bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg';

        const svgHtml = `
            <svg width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
        `;

        removeButton.innerHTML = svgHtml;
        tagInputContainer.appendChild(input);
        removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            parentContainer.removeChild(tagInputContainer);
        });
        tagInputContainer.appendChild(removeButton);

        parentContainer.appendChild(tagInputContainer);
      }, []);




    const addTagHandler = React.useCallback((e) => {
        e.preventDefault(); 
        createTagInput()
    }, [createTagInput])

    const addIngredientHandler = React.useCallback((e) => {
        e.preventDefault(); 
        createIngredientInput()
    }, [createIngredientInput])

    const addPrepHandler = React.useCallback((e) => {
        e.preventDefault(); 
        createPrepInput()
    }, [createPrepInput])



    React.useEffect(() => {
        createTagInput()
        createIngredientInput()
        createPrepInput()
    }, [createTagInput, createIngredientInput, createPrepInput])

  return (
        
        <div id="crud-modal" className={`backdrop-filter backdrop-blur-md bg-gray-900/50 overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full`}>
            <div className="relative p-4 w-full max-w-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">

                <div className="relative bg-white rounded-lg shadow max-h-[60vh] overflow-scroll">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900e">
                            Create New Recipe
                        </h3>
                        <button onClick={() => {setIsOpen(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                <input onChange={handleAllInputChange} value={formData.title} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type recipe title" required="" />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <textarea onChange={handleAllInputChange} value={formData.description} name="description" id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write recipe description here"></textarea>                    
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="difficulty" className="block mb-2 text-sm font-medium text-gray-900">Difficulty</label>
                                <select  onChange={handleAllInputChange} defaultValue={formData.difficulty} name="difficulty" id="difficulty" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                    <option value="">Select difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="difficult">Difficult</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="tags" className="block mb-2 text-sm font-medium text-gray-900 ">Tags</label>
                                <div className="tags flex flex-col gap-2 mb-2">
                                    {/* <div className='flex' id='tag-1'>
                                        <input type="text" name="tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter tag" required="" />
                                        <button id='removet-1' className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg>
                                        </button>
                                    </div> */}
                                </div>
                                <button onClick={(e) => addTagHandler(e)} className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded'>Add tag</button>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-gray-900 ">Ingredients</label>
                                <div className="ingredients flex flex-col gap-2 mb-2">
                                    {/* <div className='flex' id='ingredient-1'>
                                        <input type="text" name="ingredients" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter ingredient" required="" />
                                        <button id='removei-1' className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg>
                                        </button>
                                    </div> */}
                                </div>
                                <button onClick={(e) => addIngredientHandler(e)} className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded'>Add ingredient</button>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="prepSteps" className="block mb-2 text-sm font-medium text-gray-900 ">Preparation steps</label>
                                <div className="prepSteps flex flex-col gap-2 mb-2">
                                    {/* <div className='flex' id='prepStep-1'>
                                        <input type="text" name="prepSteps" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Enter ingredient" required="" />
                                        <button id='removep-1' className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                            </svg>
                                        </button>
                                    </div> */}
                                </div>
                                <button onClick={(e) => addPrepHandler(e)} className='bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded'>Add step</button>
                            </div>
                        </div>
                        <button onClick={createRecipeHandler} type="submit" className="text-white inline-flex items-center w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add new recipe
                        </button>
                    </form>
                </div>
            </div>
        </div> 

  )
}

export default CreateRecipe