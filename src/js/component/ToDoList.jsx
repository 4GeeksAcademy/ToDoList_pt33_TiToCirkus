import React, {useState, useEffect} from 'react'
import Task from "./Task"

//usar useEffect()



const ToDoList = () => {

    const [newTask, setNewTask] = useState("");

    const [taskList, setTaskList] = useState([]);

    const getData = async () => {
        const response = await fetch('https://playground.4geeks.com/todo/users/luis_silva');
        if (response.ok) {
            
            const data = await response.json();
            setTaskList(data.todos)
            return data;
        } else {
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
    const deleteTask = async() =>{
        const response = await fetch('https://playground.4geeks.com/todo/todos/'+, {
            method: 'DELETE',
      
        });
        if (response.ok) {
     
        }

    };
    
    useEffect(()=>{
        
        getData();
    }, [])

    return (
        <div className="container ">
            <input type="text" value={newTask} placeholder="What do you want to do next?"
				onChange={(event) => setNewTask(event.target.value)}

				onKeyUp={(event) => {
                    if(event.key == "Enter") {
                        addNewTask()
                    }

				}}
			/>
            {(taskList.length == 0) && <div>No more task! Time for a drink!</div>}
            {taskList.map( (tarea, indice)=> <Task task={tarea.label} key={indice} onRemove={()=>{
                setTaskList(taskList
                    .filter((_tarea, indiceABorrar)=> indice != indiceABorrar))
            }}/>)}
           <p>{taskList.length} items left</p>
        </div>
    )
}

export default ToDoList;