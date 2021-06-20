import React, {useState} from "react";
import Todolist, {FilterValuesType, TaskType} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()


    const [todoLists, setTodolists] = useState<TodoListType[]>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "completed"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Chokolate", isDone: false},
        ]
    })

    function removeTodolist(todoListID: string) {
        const removeTodolist = todoLists.filter(tl => tl.id !== todoListID)
        setTodolists(removeTodolist)
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID=v1()
        const newTodoList: TodoListType={
            id:newTodoListID,
            title,
            filter:"all"
        }
        setTodolists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]:[]})
    }
    function removeTask(taskId: string, todoListID: string) {
        const removeFilterTasks = tasks[todoListID].filter(t => t.id !== taskId)
        setTasks({...tasks, [todoListID]: removeFilterTasks})
    }

    function addItem(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }
    function changeStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        const upDatedTasks = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
        setTasks({...tasks, [todoListID]: upDatedTasks})
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const upDatedTasks = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks({...tasks, [todoListID]: upDatedTasks})
    }
    function changeTodoListTitle(title:string, todoListID: string){
        const updatedTodoList = todoLists.map(tl => tl.id===todoListID ? {...tl, title} : tl)
        setTodolists(updatedTodoList)
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const upDatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl)
        setTodolists(upDatedTodoList)
    }

    function getTasksForTodoList(todolist: TodoListType): Array<TaskType> {
        if (todolist.filter === "active") {
            return tasks[todolist.id].filter(t => !t.isDone)
        }
        if (todolist.filter === "completed") {
            return tasks[todolist.id].filter(t => t.isDone)
        } else {
            return tasks[todolist.id]
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    return (<Todolist
                            key={tl.id}
                            id={tl.id}
                            tasks={getTasksForTodoList(tl)}
                            title={tl.title}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addItem}
                            changeStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />

                    )
                })
            }

        </div>
    );
}

export default App;



