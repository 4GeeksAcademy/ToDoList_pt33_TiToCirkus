import React, {useState, useEffect} from 'react'
import Task from "./Task"

//usar useEffect()



const ToDoList = () => {

    const [newTask, setNewTask] = useState("");

    const [taskList, setTaskList] = useState([]);

    const createUser = async () =>{
        const response = await fetch('https://playground.4geeks.com/todo/users/luis_silva', {
            method: 'POST'
              });
        if (response.ok) {
       
        getData()    
        }
    };
    const getData = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/users/luis_silva');
        if (response.ok) {
            
            const data = await response.json();
            setTaskList(data.todos)
            return data;
        } else {
            createUser()
            console.log('error: ', response.status, response.statusText);
            /* Handle the error returned by the HTTP request */
            return {error: {status: response.status, statusText: response.statusText}};
        };
    };
    
    const addNewTask = async() =>{
        const response = await fetch('https://playground.4geeks.com/todo/todos/luis_silva', {
            method: 'POST',
            body: JSON.stringify({
                label: newTask,
                is_done: false
              }), 
            headers: {
               'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setNewTask("")
            getData()    
        }

    };
    const deleteTask = async(id) =>{
        const response = await fetch('https://playground.4geeks.com/todo/todos/'+ id, {
            method: 'DELETE',
      
        });
        if (response.ok) {
            getData()
        }
        console.log("llegue hasta aqui")
    };
    
    useEffect(()=>{
        
        getData();
    }, [])

    const deleteUser = async ()=>{
        const response = await fetch('https://playground.4geeks.com/todo/users/luis_silva', {
            method: 'DELETE',
      
        });
        if (response.ok) {
            //pregunta: Este getData() hace algo?
            getData()
        }
       
    }

    

    return (
        <div className="container border border-1 col-4 bg-light.bg-gradient">
            <h1>To Do</h1>
            <input className='my-2 form-control' type="text" value={newTask} placeholder="What do you want to do next?"
				onChange={(event) => setNewTask(event.target.value)}

				onKeyUp={(event) => {
                    if(event.key == "Enter") {
                        addNewTask()
                    }

				}}
			/>
            {(taskList.length == 0) && <div>No more task! Time for a drink!</div>}
            {taskList.map( (tarea, indice)=> <Task task={tarea.label} key={indice} onRemove={()=>{
                deleteTask(tarea.id);
                
            }}/>)}
           <p>{taskList.length} items left</p>
           <button onClick={()=>{
            deleteUser();
           }}>Clean all</button>
        </div>
    )
}

export default ToDoList;