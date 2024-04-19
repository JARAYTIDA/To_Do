import React, {useState, useEffect} from 'react'
import { ListCard } from '../components'
import Datepicker from "react-tailwindcss-datepicker"; 
import { useNavigate } from 'react-router-dom';


const Finished = () => {
    const email = window.localStorage.getItem('email_id');
    const navigate = useNavigate()
    const [cnt, setcnt] = useState(1)
    const [tasks, settasks] = useState([])
    const [add_task, setadd_task] = useState('')
    const [tasksData, settasksData] = useState({})
    const [once, setonce] = useState(false)

    const addTask = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/auth/add_task?email_id=${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({task: add_task}),
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
        <div className='flex justify-center text-2xl'>Finished Tasks</div>
        {tasks.length === 0 ? <h1 className='text-3xl flex flex-col justify-center items-center mx-auto'>No finished tasks are available</h1> : tasks.map((task, index) => (
            <div>
                {task.finished === true && < ListCard key={index} date = {task.date} status={task.finished} task = {task.task} />}
            </div>
        ))}
    </div>
  )
}

export default Finished