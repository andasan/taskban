import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import TaskbanList from "./components/TaskbanList";
import TrelloActionButton from "./components/TaskbanActionButton";

const AppContainer = styled.div`
  background-color: orange;
  height: 100vh;
  padding: 50px;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

function App() {
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch({
      type: "DRAG_HAPPENED",
      payload: {
        droppableIdStart: source.droppableId,
        droppableIdEnd: destination.droppableId,
        droppableIndexStart: source.index,
        droppableIndexEnd: destination.index,
        draggableId,
        type
      },
    });
  };

  const lists = useSelector((state) => state.lists);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppContainer>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <ListContainer 
              {...provided.droppableProps} 
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <TaskbanList
                  key={list.id}
                  listId={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <TrelloActionButton list />
            </ListContainer>
          )}
        </Droppable>
      </AppContainer>
    </DragDropContext>
  );
}

export default App;
