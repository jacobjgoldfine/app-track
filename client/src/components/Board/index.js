import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
//set uuid into a global variable and grab?

import { useQuery } from "@apollo/client";
import { QUERY_ALL_APPLICATIONS } from "../../utils/queries";

//importing modal and button to open when clicked on the card
import Button from "@mui/material/Button";
import CardModal from "./CardModal";

//cards that will render onto the lanes/columns (examples) - need to create mutation and pull from database
// const cardApplied = [
//   { id: uuidv4(), jobTitle: "Full Stack Web Developer" },
//   { id: uuidv4(), jobTitle: "Senior Developer" },
// ];
const cardApplied = [];
const cardWish = [];
const cardReject = [];
const cardFollow = [];

// console.log(cardApplied);
//columns/lanes that the cards will populate onto
const columnLanes = {
  //uuid populates a random specific id for the group id - this will apply to the lane the card will be inside of
  applied1: {
    lane: "Applied",
    cards: cardApplied,
  },
  wishlist1: {
    lane: "Wishlist",
    cards: cardWish,
  },
  rejected1: {
    lane: "Rejected",
    cards: cardReject,
  },
  followUp1: {
    lane: "Follow-up",
    cards: cardFollow,
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
    // } else {
    //   //have our columns/lanes and will get by the id
    //   const column = columns[source.droppableId];

    //   //copying cards so that we are not manipulating our original state
    //   const copiedCards = [...column.cards];

    //   //need to slice out the card from the array
    //   const [removed] = copiedCards.splice(source.index, 1);
    //   copiedCards.splice(destination.index, 0, removed);
    //   //will allow to set cards in new columns
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       cards: copiedCards,
    //     },
    //   });
  }
};

function RenderBoard() {
  //sets state for columns to render the columns
  const [columns, setColumns] = useState(columnLanes);

  const { loading, data } = useQuery(QUERY_ALL_APPLICATIONS);
  console.log(loading);
  console.log(data);
  const cardAps = data?.applications || [];

  const cardLanes = cardAps.map(function (element) {
    switch (element.lane) {
      case "Applied":
        const cardIDA = uuidv4();
        return cardApplied.push({ id: cardIDA, jobTitle: element.jobTitle, appID: element._id });

      case "Wishlist":
        const cardIDW = uuidv4();
        return cardWish.push({ id: cardIDW, jobTitle: element.jobTitle, appID: element._id });

      case "Rejected":
        const cardIDR = uuidv4();
        return cardReject.push({ id: cardIDR, jobTitle: element.jobTitle, appID: element._id });

      case "Follow-Up":
        const cardIDF = uuidv4();
        return cardFollow.push({ id: cardIDF, jobTitle: element.jobTitle, appID: element._id });

      default:
        break;
    }
    return cardLanes;
  });

  console.log(cardApplied);
  // useEffect(() => {
  //   let updatedColumns = {
  //     ...columnLanes,
  //     //have to find a way to set to applied id
  //     applied1: { lane: "Applied", cards: data?.applications },
  //   };
  //   if (loading) {
  //     console.log("loading");
  //   } else {
  //     setColumns(updatedColumns);
  //   }

  //   return () => {};
  // }, [data]);

  //opens modal - sets it to closed first and then should expand once click button
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      {/* at minimum needs 'onDragEnd' = dragdropcontext will reorder the items - if drag into a new column, will delete from the old column */}
      {loading ? (
        <div>Loading...</div>
      ) : (
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
                          {column?.cards.map((item, index) => {
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
                                      <Button onClick={handleOpen}>
                                        Expand
                                        <CardModal id={item._id} open={open} />
                                      </Button>
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
      )}
    </div>
  );
}

export default RenderBoard;
