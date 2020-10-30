import React from "react";
import TaskbanCard from "./TaskbanCard";
import TaskbanActionButton from "./TaskbanActionButton";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Container = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
`;

const TaskbanList = ({ listId, title, cards, index }) => {
  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listId)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4 style={{ textTransform: "capitalize" }}>{title}</h4>
                {cards.map((card, index) => (
                  <TaskbanCard
                    key={card.id}
                    index={index}
                    text={card.text}
                    id={card.id}
                  />
                ))}
                {provided.placeholder}
                <TaskbanActionButton listId={listId} />
              </div>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default TaskbanList;
