import React, { useState , useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { GrTasks } from "react-icons/gr";


const ToDos = () => {

    const[todo, setTodo] = useState("");
    const[todos, setTodos] = useState([]);

    const handleChange =(e)=>{
        setTodo(e.target.value);
    }

    useEffect(() => {
        let todoString = localStorage.getItem("todos")
        if(todoString){
          let todos = JSON.parse(localStorage.getItem("todos")) 
          setTodos(todos)
        }
      }, [])
      
    
      const saveToLS = (params) => {
        localStorage.setItem("todos", JSON.stringify(todos))
      }

    const handleAdd = () => {
        if (todo.trim() !== "") {
            setTodos([...todos, { id: uuidv4(), todo }]);
            console.log(todos);
            setTodo(""); // Clear the input field
        }
        saveToLS();
    };

    const handleDelete=(e, id)=>{
        let t= todos.filter(i=>i.id!==id)
        setTodos(t[0].todo)
        let newTodo = todos.filter(item=>{
            return item.id!=id
        });
        setTodos(newTodo);
        saveToLS();
    }

    const handleEdit=(e,id)=>{
        let t = todos.filter(i=>{
            return i.id===id
        });
        setTodo(t[0].todo);

        let newTodo = todos.filter(item=>{
            return item.id!=id
        });
        setTodos(newTodo);
        saveToLS();
    }

    
  return (
    <>
      <div className="sm:w-full h-full sm:mx-0 md:container md:mx-auto md:my-5 rounded-xl p-5 bg-violet-300 min-h-screen md:w-[95%]">
        <h1 className='flex  justify-center items-center mx-auto gap-3 font-bold md:text-4xl sm:text-xl text-blue-950'><GrTasks />iTask</h1>
           <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className='md:text-2xl text-left sm:text-sm font-bold text-blue-800'>Add a Todo</h2>
            <div className="flex">
  
            <input  onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd}  className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white'>Save</button>
            </div>
           </div>
           <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
           <h2 className='md:text-2xl text-left sm:text-sm font-bold text-blue-800'>Your Todos</h2>

           <div className="todos">
            {todos.map(item=>{
   
            return <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'> 
              <div>{item.todo}</div>
              </div>

              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div> 
              
            </div>
            })}
           </div>
          
           
         </div>
      
    </>
  )
}

export default ToDos

          