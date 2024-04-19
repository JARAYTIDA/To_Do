import React, {useState, useEffect} from 'react'
import { ListCard } from '../components'
import Datepicker from "react-tailwindcss-datepicker"; 
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const email = window.localStorage.getItem('email_id');
    const navigate = useNavigate()
    const [cnt, setcnt] = useState(1)
    const [tasks, settasks] = useState([])
    const [add_task, setadd_task] = useState('')
    const [tasksData, settasksData] = useState({})
    const [once, setonce] = useState(false)
    const [date, setdate] = useState('')

    const addTask = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/auth/add_task?email_id=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({task: add_task, date:date}),
            });

            if (response.ok) {
                const data = await response.json();
                
                console.log(data); // Response from the server
                // window.localStorage.setItem('email_id', data[0].email_id)
                // navigate('/'
                
                setadd_task('')
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
            // navigate('/login')
        }
    }


    const getTasks = async () => {
    
        try {
            const response = await fetch(`http://localhost:5000/auth/all_tasks?email_id=${email}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data.tasks);
                settasks(data.tasks)
                console.log(tasks);
                console.log(tasks.length)
                if(once === false){
                    setonce(true);
                }
            } else {
                // navigate('/login');
                console.error('Failed to fetch user');
            }
        } catch (error) {
            console.log(error);
        }
        // event.preventDefault();
    }

    
    useEffect(() => {
        if(email === null || email === undefined){
            navigate('/login')
        }
        else{
            getTasks();
        }
    }, [once])

    const [value, setValue] = useState({ 
        startDate: null ,
        endDate: null 
        }); 
        
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue); 
        setValue(newValue); 
    } 
  return (
    <div className=''>
        {tasks.length === 0 ? <h1 className='text-3xl flex flex-col justify-center items-center mx-auto'>All tasks are completed</h1> : tasks.map((task, index) => (
            <div>
                {task.finished === false && < ListCard key={index} date = {task.date} status={task.finished} task = {task.task} />}
            </div>
        ))}

        <div style={{width:'500px'}} className=' my-2 flex flex-col justify-center items-center mx-auto'>
            <label htmlFor="message" className="block mb-2 font-medium text-2xl text-gray-800">Your Task Name</label>
            <textarea onChange={(e) => setadd_task(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your Task here..."></textarea>
        </div>
        <div style={{width:'500px'}} className='flex flex-col justify-center items-center mx-auto'>
            <label htmlFor="message" className="block mb-2 font-medium text-2xl text-gray-800">Choose Date</label>
            <input type="date" onChange={(e) => setdate(e.target.value)}/>
        </div>
        <div className=" h-screen flex justify-center items-center">
            <div style={{width:'500px'}}>
            </div>
            <div className="absolute bottom-4 right-4">
                <button onClick={addTask} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Add task +
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home