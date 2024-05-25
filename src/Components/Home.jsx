import React, {useEffect, useState} from 'react';
import Task from './Task';

const Home = () => {
  const initialArray = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  const [tasks , settasks] = useState(initialArray); 
  const [title , settitle] = useState("");
  const [description , setdescription] = useState("");

 

  const submitHandler = (e)=>{
    e.preventDefault();

    settasks([...tasks , {title , description}])
    settitle("")
    setdescription("")
  }

  const deleteTask = (index)=>{
    const filteredArray = tasks.filter((val , i) =>{
      return i !== index;
    });
    settasks(filteredArray);
  }

  useEffect(() => {
      localStorage.setItem("tasks" , JSON.stringify(tasks))
    } , [tasks])
  

  return (
    <div className="container">
        <form onSubmit={submitHandler}>

            <input  
            type="text" 
            placeholder="Title"
            value={title}
            onChange={(e)=>
              settitle(e.target.value)
            }/>

            <textarea placeholder='Description' 
            rows={4}
            value={description}
            onChange={(e)=>
              setdescription(e.target.value)
            }
            ></textarea>

            <button type='submit' onClick={deleteTask}>ADD</button>
        </form>

        {tasks.map((item , index) =>(
          <Task key={index} title={item.title} description={item.description} deleteTask={deleteTask} index={index} />
        ))}   

    </div>
  )
}

export default Home