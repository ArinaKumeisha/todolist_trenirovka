import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import "./App.css"
import {Button, TextField} from "@material-ui/core";

type AddItemPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemPropsType) {
    debugger
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
            setTitle("")
        }
    }
    const addItem = () => {
        const validate = title.trim()
        if (validate) {
            props.addItem(validate)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const MessageError = error ? <div className={"errorFind"}>Title is required</div> : null
    return (
        <div>

            <TextField
                variant={"outlined"}
                label={"Type value"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
                error={!!error}   //ошибка
             helperText={error}
            />

            <Button onClick={addItem} variant={"contained"} color={"primary"}>+
            </Button>
            {MessageError}
        </div>

    )
}

export default AddItemForm;