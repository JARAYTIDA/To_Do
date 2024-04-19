import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ListCard = ({task, date, status}) => {
    const email = window.localStorage.getItem('email_id');
    const navigate = useNavigate()
    console.log(status)
    const removeTask = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/auth/finish?email_id=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({task: task}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); 
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            // navigate('/login')
        }
    }

    return (
        <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-sm mx-auto mt-16">
            <li>
                <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Task : {task}</h3>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Date: <span className="text-green-600">{date}</span></p>
                        
                        <button onClick={removeTask} className="font-medium text-yellow-500 hover:text-yellow-700">
                            {status ? <div>Reassign</div> : <div>Finish</div>}
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default ListCard