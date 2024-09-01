import Navbar from "./components/navbar";
import { useState,useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
const [todo, settodo] = useState("");
const [todos, settodos] = useState([]);
const [showfinished, setshowfinished] = useState(false);


useEffect(() => {
  let str = localStorage.getItem("todos");
  if(str){
    let todo_obtained = JSON.parse(localStorage.getItem("todos"));   
    settodos(todo_obtained);
  }
}, [])

// const savetoLocal = (params)=>{
//   localStorage.setItem("todos",JSON.stringify(todos));
// }

useEffect(() => {
  localStorage.setItem("todos",JSON.stringify(todos));
}, [todos])




const handleEdit = (e,id)=>{
  let index = todos.findIndex(item=>{
    return item.id === id;
  })
  let newtodos = [...todos];
  settodo(newtodos[index].todo);
  let newtodo = todos.filter(item=>{
    return item.id !== id;
  })
  settodos(newtodo);
  // savetoLocal();
}
const handleDelete = (e,id)=>{
  let newtodo = todos.filter(item=>{
    return item.id !== id;
  })
  settodos(newtodo);
  // savetoLocal();
}
const handleAdd = ()=>{
  if(todo !== ""){
    settodos([...todos,{id:uuidv4(),todo,iscompleted : false}]);
    settodo("");
  }
  // savetoLocal();
}

const handlechange = (e)=>{
  settodo(e.target.value);
}
const handleCheckboChange = (e)=>{
  let id = e.target.name;
  let index = todos.findIndex((item)=>{
    return item.id == id;
  })
  let newtodos = [...todos]
  newtodos[index].iscompleted = !newtodos[index].iscompleted;
  settodos(newtodos);
  // savetoLocal();
}

const handleshowAll = (e)=>{
  setshowfinished(!showfinished);
}

  return (
    <>
      <Navbar/>
      <div className="container mx-auto p-5 rounded-xl my-5 min-h-[80vh]  bg-slate-600 text-white sm:w-1/2 w-3/4">
        <h1 className="flex justify-center items-center font-bold text-4xl">Taskify - Manage Your Daily Task</h1>
        <div className="addtodo py-5">
          <h1 className="text-center text-2xl font-bold my-2">Add a Task</h1>
          <input onChange={handlechange} value={todo} type="text" placeholder="Enter a task" className="2xl:w-3/4 rounded-md text-black px-2 p-1 w-full"/>
          <button onClick={handleAdd} className="button_css 2xl:w-32 2xl:h-9 my-4 w-full 2xl:mx-4 mx-0">
            Add
            </button>
        </div>
        <div className="checkbox flex gap-5 my-3">
          <input onChange={handleshowAll} checked={showfinished} type="checkbox" name="" id="" /> <p>Show All Task</p>
        </div>
        <h2 className="text-lg font-bold">Your Task</h2>
        {todos.length == 0 && <p className="mx-5">No Task to Display</p>}
        {todos.map((item)=>{
          return (showfinished || !item.iscompleted) && <div key={item.id} className="todos">
          <div className="todo flex justify-between sm:w-3/4 my-4 w-full">
            <div className="flex gap-2 items-center">
              <input onChange={handleCheckboChange} type="checkbox" name={item.id} value={item.iscompleted} checked={item.iscompleted} />
              <p className={item.iscompleted?"line-through text-black":""}>{item.todo}</p>
            </div>
            <div className="buttons flex items-center">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className="button_css "><FaEdit/></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className="button_css -mx-3"><AiFillDelete/ ></button>
            </div>
          </div>
        </div>
        })}
      </div>
    </>
  )
}

export default App
