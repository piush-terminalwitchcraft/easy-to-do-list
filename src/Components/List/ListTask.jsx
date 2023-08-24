import React, { useEffect, useState } from 'react'
import './../../Assets/Styles/list-task.css'
import { toast } from 'react-hot-toast';
import { useDrag, useDrop } from 'react-dnd';

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

  let header = "Todos 🎯🗒️";
  let tasksMap = todos;
  let highlight = "";

  const addItemToSection = (id) => {
    console.log("Dropped ", id, status);
    setTasks((prev) => {
      const mTask = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status }
        }
        return t;
      })

      return mTask;
    })
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  if (status === "inprogress") {
    header = "In progress 🏗️🛠️";
    tasksMap = inProgress;
  } else if (status === "completed") {
    header = "Completed ✅🥳";
    tasksMap = completed;
  }

  if (isOver) {
    highlight = "section-highlight"
  } else {
    highlight = "";
  }

  return (
    <div ref={drop} className={`section ${highlight}`}>
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

  let blur = "";
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const handleRemove = (taskID) => {
    const fTasks = tasks.filter(task => task.id !== taskID);
    setTasks(fTasks);
    toast.success("Tasks removed successfully", {
      duration: 1000,
    })
  }

  if(isDragging){
    blur = "task-drag"; 
  } else {
    blur = "";
  }

  return (
    <div className={`task ${blur}`} ref={drag}>
      <p>{task.name}</p>
      <button className='delete-task' onClick={() => handleRemove(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  );
}

export default ListTask