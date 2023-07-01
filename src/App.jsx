import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'


import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
    {
      id: 1,
      title: 'Mover la cama'
    },
    {
      id: 2,
      title: 'Comol la cama'
    },
    {
      id: 3,
      title: 'Lololo lolo'
    }
  ]


  const [todos, setTodos] = useState(initialTodos)

  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  const handelDragEnd = resultado =>{
    if(!resultado.destination) return //Se hace para no dañar el drop anulando cuando se sale de la posiscion
    const startIndex = resultado.source.index
    const endIndex = resultado.destination.index
    
    const copyArray = [...todos]//se copian las tareas 
    const [reorderItem] = copyArray.splice(startIndex, 1 )//se toma la posicion para eliminar y se retorna (se destructura el reorderItem)
    
    copyArray.splice(endIndex,0, reorderItem)


    setTodos(copyArray) //Se pone en el array original 
  }

  return (
    <>
      <h1>Drag And Drop</h1>
      <DragDropContext onDragEnd={handelDragEnd}>
        <Droppable droppableId='todos'>
          {
            (dropableProvider) => (
              <ul ref={dropableProvider.innerRef} {...dropableProvider.droppableProps}>
                {
                  todos.map((todo, index) => (
                    <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>
                      {
                        (draggableProvider) =>
                          <li ref={draggableProvider.innerRef}
                          {...draggableProvider.dragHandleProps}
                          {...draggableProvider.draggableProps}
                          
                          >
                          {todo.title}
                          </li>

                      }

                    </Draggable>
                  ))
                }
                {dropableProvider.placeholder} 
              </ul>
            )
          }

        </Droppable>
      </DragDropContext>
    </>
  )
}

export default App
