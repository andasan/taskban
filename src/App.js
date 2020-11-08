import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import TaskbanList from "./components/TaskbanList";
import TrelloActionButton from "./components/TaskbanActionButton";
import TaskBanLogo from "./assets/images/taskban.png";

const AppContainer = styled.div`
  background-color: #301728FF;
  height: 100vh;
  padding: 50px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.img`
  height: 50px;
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
        <HeaderContainer>
          <LogoContainer src={TaskBanLogo} alt="taskban logo" />
        </HeaderContainer>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided, snapshot) => (
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
