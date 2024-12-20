import React from 'react'
import { Link } from 'react-router'

function RecipeCard({data}) {


    React.useEffect(() => {
        console.log(data)
    })


  return (
    
    <div className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)] relative min-h-[200px] p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-4">
        <div className='absolute top-1 right-0'>
            <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>{data.difficulty}</span>
        </div>
        <Link to={`/recipe/${data.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{data.title}</h5>
        </Link>
        <p>{data.description}</p>
        <Link to={`/recipe/${data.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Learn more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>

        <div>
            {data.tags.map((tag) => (
                <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full">{tag}</span>
            ))}
        </div>
    </div>

  )
}

export default RecipeCard