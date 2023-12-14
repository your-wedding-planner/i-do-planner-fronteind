import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTableForm from "./AddTableForm";
import TableEdit from "./TableEdit";
import toast from "react-hot-toast";
import edit_icon from "../assets/edit-icon.png";
import delete_icon from "../assets/delete-icon.png";

function SeatingPlanner() {
  const storedToken = localStorage.getItem("authToken");
  let guestsList;
  const [tablesList, setTablesList] = useState([]);
  const [showTableEdit, setShowTableEdit] = useState(false);
  let unassignedTable;
  const [editingTableId, setEditingTableId] = useState();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const loadData = async () => {
    storedToken;
    try {
      const guestsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/guests`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      guestsList = guestsResponse.data;

      const tablesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/seatingTables`,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      filterUnassignedGuests(guestsResponse.data, tablesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filterUnassignedGuests = (guestsArray, tablesArray) => {
    const filteredGuests = guestsArray.filter(
      (guest) => guest.seatingTable === null
    );
    createUnassignedTable(filteredGuests, tablesArray);
  };

  const createUnassignedTable = (unassignedGuests, tablesArray) => {
    if (unassignedTable != undefined) return;

    unassignedTable = {
      _id: "-1",
      tableName: "Unassigned Guests",
      assignedGuests: unassignedGuests,
    };

    tablesArray.unshift(unassignedTable);
    setTablesList(tablesArray);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sourceTable = tablesList.find(
        (table) => table._id === source.droppableId
      );
      const reorderedGuests = reorder(
        sourceTable.assignedGuests,
        source.index,
        destination.index
      );
      sourceTable.assignedGuests = reorderedGuests;
      updateTable(sourceTable);
    } else {
      const sourceTable = tablesList.find(
        (table) => table._id === source.droppableId
      );
      const destinationTable = tablesList.find(
        (table) => table._id === destination.droppableId
      );
      const draggedGuest = sourceTable.assignedGuests[source.index];
      destinationTable.assignedGuests.splice(
        destination.index,
        0,
        draggedGuest
      );
      sourceTable.assignedGuests.splice(source.index, 1);

      let newTableId = destinationTable._id;
      if (newTableId === "-1") {
        draggedGuest.seatingTable = null;
      } else {
        draggedGuest.seatingTable = destinationTable._id;
      }

      updateDatabase(sourceTable, destinationTable, draggedGuest);
    }
  };

  const updateDatabase = (table1, table2, guest) => {
    updateGuest(guest);

    if (table1._id != "-1") {
      updateTable(table1);
    }

    if (table2._id != "-1") {
      updateTable(table2);
    }
  };

  const updateGuest = (guest) => {
    storedToken;
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/guests/${guest._id}`, guest, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        console.log("Guest edited successfully");
      })
      .catch((error) => console.log(error));
  };

  const updateTable = (table) => {
    storedToken;
    axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/seatingTables/${table._id}`,
        table,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        console.log("Table edited successfully");
      })
      .catch((error) => console.log(error));
  };

  const reloadTables = () => {
    setTablesList([]);
    unassignedTable = undefined;
    loadData();
  };

  const handleEditClick = (tableId) => {
    setShowTableEdit(true);
    setEditingTableId(tableId);
  };

  const handleDeleteClick = (table) => {
    storedToken;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if (confirmDelete) {
      table.assignedGuests.map((guest) => {
        guest.seatingTable = null;
        updateGuest(guest);
      });

      axios
        .delete(
          `${import.meta.env.VITE_API_URL}/api/seatingTables/${table._id}`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then(() => {
          console.log("Table deleted successfully");
          toast.success("Table deleted successfully");
          reloadTables();
        })
        .catch((error) => console.log(error));
    }
  };

  const navigate = useNavigate();

  const handleGuestDetailsClick = (guestId) => {
    navigate(`/GuestDetails/${guestId}`);
  };

  return (
    <div className="container">
      <AddTableForm reloadTables={reloadTables} />
      <DragDropContext onDragEnd={onDragEnd}>
        {tablesList.map((table) => (
          <div className="seatingPlanner" key={table.id}>
            <div className="table-header">
              <h1 className="table-name">{table.tableName}</h1>
              {table._id !== "-1" && (
                <div className="table-buttons">
                  <button className="btn" onClick={() => handleEditClick(table._id)}>
                    <img className="table-assignment-icons" src={edit_icon} alt="Edit table" />
                  </button>
                  <button className="btn" onClick={() => handleDeleteClick(table)}>
                    <img className="table-assignment-icons" src={delete_icon} alt="Delete table" />
                  </button>
                </div>
              )}
            </div>
            <div className="guests-container"></div>
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
                          key={guest._id}
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}
                          className="guest-item"
                          onClick={() => handleGuestDetailsClick(guest._id)}
                        >
                          {`${guest.firstName} ${guest.lastName}`}
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
      {showTableEdit && (
        <TableEdit tableId={editingTableId} reloadTables={reloadTables} />
      )}
    </div>
  );
}

export default SeatingPlanner;
