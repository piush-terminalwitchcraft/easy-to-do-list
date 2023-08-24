import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './../../Assets/Styles/header.css'
import { toast } from 'react-hot-toast';
function Header(props) {
    const { tasks, setTasks } = props;

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: "todos"
    })

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if(task.name.length < 1) return toast.error("Length of task shoudl be greater than 1",{
            duration: 1000
        }); 
        if(task.name.length > 90) return toast.error("Task should be less than 90 characters",{
            duration: 1000
        });

        setTasks((prev)=>{
            const lists = [...prev, task];
            return lists;  
        })
        return toast.success("Tasks added successfully", {
            duration: 1000
        })
    }

    console.log(task)
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' className='header-input'
                placeholder='Enter task description'
                    onChange={(e) => setTask({ ...task, id: uuid(), name: e.target.value })}
                    value={task.name}
                ></input>
                <button className='header-submit'>Submit</button>
            </form>
        </div>
    )
}

export default Header