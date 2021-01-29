import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleOnChange(){

        toggleTodo(todo.id)
    }
    return (
        <div>
            <label className="items">
                <input type="checkbox" checked={todo.complete} onChange={handleOnChange}/>
            {todo.name}
            </label>
        </div>
    )
}
