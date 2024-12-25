import React from 'react'

function InfoPopup({ setOpenPopup, data }) {



  return (
          
    <div id="crud-modal" className={`backdrop-filter backdrop-blur-md bg-gray-900/50 overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full`}>
    <div className="relative p-4 w-full max-w-md top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">

        <div className="relative bg-white rounded-lg shadow max-h-[60vh] overflow-scroll">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900e">
                    Detailed Information
                </h3>
                <button onClick={() => {setOpenPopup(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <div className="p-6 flex flex-col max-h-[50vh] overflow-y-scroll">
                <div className="mb-2">
                    <span className="font-semibold">Title:</span> {data?.title}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Description:</span> {data?.description}
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Ingredients:</span> 
                    <ul>
                        {data?.ingredients.map((ing, index) => (
                            <li key={index}>• {ing}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Preparation:</span>
                    <ol>
                        {data?.preparation.map((prep, index) => (
                            <li key={index}>{index+1}. {prep}</li>
                        ))}
                    </ol>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Tags:</span>
                    <ul>
                        {data?.tags.map((tag, index) => (
                            <li key={index}>• {tag}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-2">
                    <span className="font-semibold">Difficulty:</span> {data?.difficulty}
                </div>
            </div>



        </div>
    </div>
</div> 
  )
}

export default InfoPopup