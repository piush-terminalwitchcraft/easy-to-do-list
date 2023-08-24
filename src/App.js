import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Header, ListTask } from './Components';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [tasks, setTasks] = useState([])


  console.log(tasks)

  return (
    <DndProvider backend={HTML5Backend}>

    <div className="App">
      <Toaster />
      <Header tasks={tasks} setTasks={setTasks}/>
      <ListTask tasks={tasks} setTasks={setTasks}/>
    </div>
    </DndProvider>
  );
}

export default App;
