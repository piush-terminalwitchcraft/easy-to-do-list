import React, { useEffect, useState } from 'react'
import './../../Assets/Styles/list-task.css'
import { toast } from 'react-hot-toast';

function ListTask(props) {
  const { tasks, setTasks } = props;
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const fTodos = tasks.filter(task => task.status === 'todos');
    const fInProgress = tasks.filter(task => task.status === 'inprogress');
    const fCompleted = tasks.filter(task => task.status === 'completed');

    setTodos(fTodos);
    setInProgress(fInProgress);
    setCompleted(fCompleted);

  }, [tasks]);

  const status = ["todos", 'inprogress', 'completed']
  return (
    <div className='list-task-body'>
      {
        status.map((val, index) => <Section key={index} status={val}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          completed={completed}
        />)
      }
    </div>
  )
}
function Section({ status, tasks, todos, setTasks, inProgress, completed }) {

  let header = "todo";
  let tasksMap = todos;

  if (status === "inprogress") {
    header = "In progress";
    tasksMap = inProgress;
  } else if (status === "completed") {
    header = "Completed";
    tasksMap = completed;
  }

  return (
    <div>
      <h2>{header}</h2>
      {tasksMap.length > 0 && tasksMap.map((task) => <Task
        task={task}
        tasks={tasks}
        setTasks={setTasks}
        key={task.id} />)}
    </div>
  )
}

function Task({ task, tasks, setTasks }) {

  const handleRemove = (taskID) => {
    const fTasks = tasks.filter(task => task.id !== taskID); 
    setTasks(fTasks); 
    toast.success("Tasks removed successfully",{
      duration: 1000,
    })
  }
  return (
    <div className="task">
      <p>{task.name}</p>
      <button className='delete-task' onClick={()=>handleRemove(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

      </button>
    </div>
  );
}

export default ListTask