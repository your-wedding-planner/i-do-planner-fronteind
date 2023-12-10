import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function SeatingPlanner() {
  const storedToken = localStorage.getItem("authToken");
  let guestsList;
  let tablesListResponse;
  const [tablesList, setTablesList] = useState([]);
  let unassignedTable;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const guestsResponse = await axios.get(
          "http://localhost:5005/api/guests",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        guestsList = guestsResponse.data;

        const tablesResponse = await axios.get(
          "http://localhost:5005/api/seatingTables",
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
        tablesListResponse = tablesResponse.data;
        filterUnassignedGuests(guestsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  const filterUnassignedGuests = (guestsArray) => {
    const filteredGuests = guestsArray.filter(guest => guest.seatingTable == null);
    createUnassignedTable(filteredGuests);
  }

  const createUnassignedTable = (unassignedGuests) => {
    if (unassignedTable != undefined) return;

    unassignedTable = {
        _id: "-1",
        nameOfTable: "Unassigned Guests",
        assignedGuests: unassignedGuests
    };

    tablesListResponse.unshift(unassignedTable);
    setTablesList(tablesListResponse);
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sourceTable = tables.find(
        (table) => table._id === source.droppableId
      );
      const reorderedGuests = reorder(
        sourceTable.assignedGuests,
        source.index,
        destination.index
      );
      sourceTable.assignedGuests = reorderedGuests;
    } else {
      const sourceTable = tables.find(
        (table) => table._id === source.droppableId
      );
      const destinationTable = tables.find(
        (table) => table._id === destination.droppableId
      );
      const draggedGuest = sourceTable.assignedGuests[source.index];
      destinationTable.assignedGuests.splice(
        destination.index,
        0,
        draggedGuest
      );
      sourceTable.assignedGuests.splice(source.index, 1);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {tablesList.map((table) => (
        <div className="seatingPlanner">
          <h1>{table.nameOfTable}</h1>
          <Droppable droppableId={table._id} direction="horizontal">
            {(droppableProvided) => (
              <ul
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="guest-container"
              >
                {table.assignedGuests.map((guest, index) => (
                  <Draggable
                    key={guest._id}
                    draggableId={guest._id}
                    index={index}
                  >
                    {(draggableProvided) => (
                      <li
                        {...draggableProvided.draggableProps}
                        ref={draggableProvided.innerRef}
                        {...draggableProvided.dragHandleProps}
                        className="guest-item"
                      >
                        {guest.firstName}
                      </li>
                    )}
                  </Draggable>
                ))}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
    </DragDropContext>
  );
}

export default SeatingPlanner;
