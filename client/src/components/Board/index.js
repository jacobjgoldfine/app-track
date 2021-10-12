import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { QUERY_ALL_APPLICATIONS } from "../../utils/queries";

//query the applications, map over applications, push into the array
//switch for each lane
//create new const array for each lane that gets fed into the columnLane

//cards that will render onto the lanes/columns (examples) - need to create mutation and pull from database
// const cardInfo = [
//   { id: uuidv4(), jobTitle: "Full Stack Web Developer" },
//   { id: uuidv4(), jobTitle: "Senior Developer" },
// ];
const cardApplied = [];
const cardWish = [];
const cardReject = [];
const cardFollow = [];
//columns/lanes that the cards will populate onto
const columnLanes = {
  //uuid populates a random specific id for the group id - this will apply to the lane the card will be inside of
  [uuidv4()]: {
    lane: "Applied",
    cards: cardApplied,
  },
  [uuidv4()]: {
    lane: "Wishlist",
    cards: [],
  },
  [uuidv4()]: {
    lane: "Rejected",
    cards: [],
  },
  [uuidv4()]: {
    lane: "Follow-up",
    cards: [],
  },
};

//if there is no other column/destination then the card will just bounce back
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;

  const { source, destination } = result;
  //this removes the cards from the original array and replaces it into the new array
  if (source.droppableId !== destination.droppableId) {
    //getting the source and destination columns
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    //making a copy of the cards within those columns in order to manipulate the arrays
    const sourceCards = [...sourceColumn.cards];
    const destCards = [...destColumn.cards];

    //we are removing the source items to implement it back later
    const [removed] = sourceCards.splice(source.index, 1);
    destCards.splice(destination.index, 0, removed);

    //now setting the cards into the new columns
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        cards: sourceCards,
      },
      [destination.droppableId]: {
        ...destColumn,
        cards: destCards,
      },
    });
  } else {
    //have our columns/lanes and will get by the id
    const column = columns[source.droppableId];

    //copying cards so that we are not manipulating our original state
    const copiedCards = [...column.cards];

    //need to slice out the card from the array
    const [removed] = copiedCards.splice(source.index, 1);
    copiedCards.splice(destination.index, 0, removed);
    //will allow to set cards in new columns
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        cards: copiedCards,
      },
    });
  }
};

function RenderBoard() {
  //sets state for columns to render the columns
  const [columns, setColumns] = useState(columnLanes);

  const cardData = useQuery(QUERY_ALL_APPLICATIONS);
  const cardAps = cardData.data.applications;
  // console.log(cardData);
  // console.log(cardData[0].lane);

  const cardLanes = cardAps.map(function (element) {
    switch (element.lane) {
      case "Applied":
        const cardID = uuidv4();
        return cardApplied.push({ id: cardID, jobTitle: element.jobTitle });

      case "Wishlist":
        return;

      case "Rejected":
        return;

      case "Follow-Up":
        return;

      default:
        break;
    }
    return;
  });

  console.log(cardApplied);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      {/* at minimum needs 'onDragEnd' = dragdropcontext will reorder the items - if drag into a new column, will delete from the old column */}
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {/* each droppable needs to have its own key on it and needs to be unique */}
        {Object.entries(columns).map(([id, column]) => {
          return (
            // takes in the children (cards)
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>{column.lane}</h2>
              {/* styling the margin between each column */}
              <div style={{ margin: 8 }}>
                <Droppable droppableId={id} key={id}>
                  {/* function that returns props - snapshot = the current thing that you have */}
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          // if something is dragging over it then will be this color
                          background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                          padding: 4,
                          width: 300,
                          minHeight: 550,
                        }}
                      >
                        {/* will map over items within the columns */}
                        {column.cards.map((item, index) => {
                          return (
                            // draggableId must be a string.  Index will return to us what index we are dragging from and dropping to
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    // dragHandleProps picks up the item
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      // if dragging will change the color
                                      backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.jobTitle}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default RenderBoard;
