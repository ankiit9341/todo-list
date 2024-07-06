import './App.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import {useState, useEffect} from 'react'

function App() {
  const [isActive, setActive] = useState(false);
  const [todo,setTodo] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [completedTask,setcompletedTask] = useState([]);

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem('todoList'));
    if (storedTodo) {
      setTodo(storedTodo);
    }
    const completedTask = JSON.parse(localStorage.getItem('completedList'));
    if (completedTask) {
      setcompletedTask(completedTask);
    }
  }, []);

  const handleEditing = (index) =>{
    let CurrEditItem = todo[index];

    setNewTitle(CurrEditItem.newTitle);
    setNewDesc(CurrEditItem.newDesc);
  }

  const handleTodo = ()=>{
    let newTodoItem = {
      title:newTitle,
      desc:newDesc
    }

    let updatedTodo = [...todo];
    updatedTodo.push(newTodoItem);
    setTodo(updatedTodo);
    localStorage.setItem('todoList',JSON.stringify(updatedTodo));

    setNewTitle('');
    setNewDesc('');
  }
  const  handleCompletedtask = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getUTCMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();

    dd = dd < 10 ? '0' + dd : dd;
    mm = mm < 10 ? '0' + mm : mm;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    

    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m;
    let filteredItem = {
      ...todo[index],
      completedOn : completedOn
    }

    let reducedTodo = [...todo];
    reducedTodo.splice(index,1);
    setTodo(reducedTodo);
    localStorage.setItem('todoList', JSON.stringify(reducedTodo))

    let updatedCompletedTodo = [...completedTask];
    updatedCompletedTodo.push(filteredItem);
    setcompletedTask(updatedCompletedTodo);
    localStorage.setItem('completedList',JSON.stringify(updatedCompletedTodo));

  }
  const handleDeleteList = (index) =>{
    let reducedTodo = [...todo];
    reducedTodo.splice(index,1);

    localStorage.setItem('todoList', JSON.stringify(reducedTodo))
    setTodo(reducedTodo);
  }
  const handleCompletedDeleteList = (index) =>{
    let reducedTodo = [...completedTask];
    reducedTodo.splice(index,1);

    localStorage.setItem('completedList', JSON.stringify(reducedTodo))
    setcompletedTask(reducedTodo);
  }

  return (
    <div className="App">
      <h1>Todo-List</h1>

      <div className="todo-wraper">
         <div className="todo-input">
           <div className="todo-input-item">
            <label htmlFor="Title">Task</label>
            <input id='Title' className="My-inputs" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} type="text" placeholder="Add your todo Task" />
           </div>
           <div className="todo-input-item">
            <label htmlFor="Description">Description</label>
            <input id='Description' className="My-inputs" type="text" value={newDesc} onChange={(e)=>setNewDesc(e.target.value)} placeholder="Add about your task" />
           </div>
           <div className="todo-input-item">
            <button disabled={newTitle.length===0} type="button" className="add-btn" onClick={handleTodo} > Add</button>
           </div>
         </div>
         
         <div className="btn-area">
          <button className={`btn ${isActive===false?"active":"none"}`} onClick={()=>setActive(false)}>Todo</button>
          <button className={`btn ${isActive===true?"active":"none"}`} onClick={()=>setActive(true)}>Completed</button>
         </div>

         <div className="todoArea">
         {
            !isActive && todo.map( (itmes,index) => {
            return <div className="allTodo" key={index}>
              <div className="todo-list-item">
         <h4 style={{color:'green', fontSize:'1.5rem'}}>{itmes.title}</h4>
         
         <p>{itmes.desc}</p>
         </div>
         <div className="icons">
           <IoMdCheckmarkCircle onClick={()=> handleCompletedtask(index)} style={{color:'green', fontSize:'1.5rem'}}/>
           <FaEdit style={{color:'grey',fontSize:'1.3rem'}} onClick={()=>handleEditing(index)} />
             <MdDelete onClick={()=> handleDeleteList(index)} style={{color:'red', fontSize:'1.5rem',marginLeft:'15px'}} />
         </div>
            </div>
            
          } )
         }
          { isActive && completedTask.map( (itmes,index) => {
            return <div className="allTodo" key={index}>
              <div className="todo-list-item">
         <h4 style={{color:'green', fontSize:'1.5rem'}}>{itmes.title}</h4>
         <p>{itmes.desc}</p>
         <p style={{fontSize:'smaller'}}>{itmes.completedOn}</p>
         </div>
         <div className="icons">
             <MdDelete onClick={()=> handleCompletedDeleteList(index)} style={{color:'red', fontSize:'1.5rem',marginLeft:'15px'}} />
         </div>
            </div>
            
          } )}
         </div>
      </div>
    </div>
  );
}

export default App;
