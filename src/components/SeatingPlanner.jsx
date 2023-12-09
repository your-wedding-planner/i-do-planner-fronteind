import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialTasks1 = [
  { id: "1", text: "Guest 1" },
  { id: "2", text: "Guest 2" },
  { id: "3", text: "Guest 3" },
  { id: "4", text: "Guest 4" },
  { id: "5", text: "Guest 5" },
];

const initialTasks2 = [
  { id: "6", text: "Guest 6" },
  { id: "7", text: "Guest 7" },
  { id: "8", text: "Guest 8" },
  { id: "9", text: "Guest 9" },
  { id: "10", text: "Guest 10" },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function SeatingPlanner() {
  const [tasks1, setTasks1] = useState(initialTasks1);
  const [tasks2, setTasks2] = useState(initialTasks2);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const tasks = source.droppableId === "tasks1" ? tasks1 : tasks2;
      const reorderedTasks = reorder(tasks, source.index, destination.index);

      if (source.droppableId === "tasks1") {
        setTasks1(reorderedTasks);
      } else {
        setTasks2(reorderedTasks);
      }
    } else {
      const draggedItem = source.droppableId === "tasks1" ? tasks1[source.index] : tasks2[source.index];
      
      if (destination.droppableId === "tasks1") {
        const newTasks1 = Array.from(tasks1);
        newTasks1.splice(destination.index, 0, draggedItem);
        setTasks1(newTasks1);

        if (source.droppableId === "tasks2") {
          const newTasks2 = Array.from(tasks2);
          newTasks2.splice(source.index, 1);
          setTasks2(newTasks2);
        }
      } else {
        const newTasks2 = Array.from(tasks2);
        newTasks2.splice(destination.index, 0, draggedItem);
        setTasks2(newTasks2);

        if (source.droppableId === "tasks1") {
          const newTasks1 = Array.from(tasks1);
          newTasks1.splice(source.index, 1);
          setTasks1(newTasks1);
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="seatingPlanner">
        <h1>Table1</h1>
        <Droppable droppableId="tasks1" direction="horizontal">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="guest-container"
            >
              {tasks1.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="guest-item"
                    >
                      {task.text}
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </div>

      <div className="seatingPlanner">
        <h1>Table2</h1>
        <Droppable droppableId="tasks2" direction="horizontal">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="guest-container"
            >
              {tasks2.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="guest-item"
                    >
                      {task.text}
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default SeatingPlanner;
