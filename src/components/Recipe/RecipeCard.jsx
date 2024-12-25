import React from 'react'
import { Link, useNavigate  } from 'react-router'
import './RecipeCard.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useContext } from 'react';
import { AppContext } from '../../App';
import InfoPopup from '../PopupPage/InfoPopup'
import CreateRecipe from '../PopupPage/CreateRecipe'




function RecipeCard({data}) {

    const {valueToRefresh, setValueToRefresh} = useContext(AppContext);
    const [openPopup, setOpenPopup] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    const navigate = useNavigate();

    // React.useEffect(() => {
    //     console.log(data)
    // })

    const deleteHandler = React.useCallback(() => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                .delete(`http://localhost:3001/recipes/${data.id}`)
                .then((response) => {navigate('/recipe'); setValueToRefresh(valueToRefresh + 1)})
                .catch((error) => console.log(error));
            }
        });
    }, [data.id, navigate]);


  return (
    <>
    {isOpen &&  <CreateRecipe  setIsOpen={setIsOpen} data={data} />}
    {openPopup &&  <InfoPopup data={data} setOpenPopup={setOpenPopup} />}
    <div className="card-div w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)] relative min-h-[200px] p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-4">
        <div className='absolute top-1 right-0'>
            <span className='bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded'>{data.difficulty}</span>
        </div>
        <Link to={`/recipe/${data.id}`}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{data.title}</h5>
        </Link>
        <p>{data.description}</p>
        <button onClick={() => setOpenPopup(true)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            Learn more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </button>

        <div>
            {data.tags.map((tag, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 mx-0.5 rounded-full">{tag}</span>
            ))}
        </div>

        <div className='btn-group absolute bottom-[-10px] right-0 pb-2 pr-2 flex justify-end items-center gap-1'>
            <button onClick={deleteHandler} className='bg-red-500 text-white rounded-xl p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                </svg>
            </button>
            <button onClick={() => setIsOpen(true)} className='bg-green-600 text-white rounded-xl p-2'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                </svg>
            </button>
        </div>
    </div>

    </>

  )
}

export default RecipeCard