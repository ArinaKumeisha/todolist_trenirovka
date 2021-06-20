import React, {ChangeEvent} from "react";
import "./App.css"
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {IconButton, Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed"
export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle:(taskID: string, title: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListID: string) => void
    changeTodoListTitle:(title:string, todoListID: string) =>void

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function Todolist(props: PropsType) {
    debugger

    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }
    const changeTodoListTitle= (title:string) => props.changeTodoListTitle(title, props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }



    const allChangeFilter = () => props.changeFilter("all", props.id)
    const activeChangeFilter = () => props.changeFilter("active", props.id)
    const completedChangeFilter = () => props.changeFilter("completed", props.id)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                           const changeTaskTitle=(title: string)=> {
                               props.changeTaskTitle(t.id, title, props.id)
                           }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : "isNotDone"}>
                                < input type="checkbox" checked={t.isDone}
                                        onChange={changeStatus}/>
                                <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
                                <IconButton onClick={() => props.removeTask(t.id, props.id)} >
                                    <Delete />
                                </IconButton>
                            </li>)})

                }

            </ul>
            <div>
                <Button
                   variant={props.filter === "all" ? "contained" : "text"}
                    onClick={allChangeFilter}>All
                </Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "text"}
                    color={"primary"}
                    onClick={activeChangeFilter}>Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "text"}
                    color={"secondary"}
                    onClick={completedChangeFilter}>Completed
                </Button>
            </div>
        </div>
    );
}

export default Todolist;