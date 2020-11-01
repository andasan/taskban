import React, { useState } from "react";
import TaskbanCard from "./TaskbanCard";
import TaskbanActionButton from "./TaskbanActionButton";
import { Draggable, Droppable } from "react-beautiful-dnd";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styled from "styled-components";

const Container = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  width: 300px;
  height: 100%;
  padding: 8px;
  margin-right: 8px;
  -webkit-box-shadow: 0px 3px 8px -2px rgba(137,137,137,0.97); 
  box-shadow: 0px 3px 8px -2px rgba(137,137,137,0.97);

  &:hover{
      background-color: #ccc;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoButton = styled.div`
  background-color: inherit;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: #4e5052;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover{
      background-color: #abaeb0;
  }
`;

const TaskbanList = ({ listId, title, cards, index }) => {
    const [toggleHover, setToggleHover] = useState(false);

    return (
        <Draggable
            draggableId={String(listId)}
            index={index}
        >
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setToggleHover(true)}
                    onMouseLeave={() => setToggleHover(false)}
                    // style={{opacity: snapshot.isDragging ? "0.5" : "1" }}
                >
                    <Droppable droppableId={String(listId)}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <HeaderContainer>
                                    <h4 style={{ textTransform: "capitalize", padding: "12px 0" }}>{title}</h4>
                                    {
                                        toggleHover && <InfoButton><MoreHorizIcon /></InfoButton>
                                    }
                                    </HeaderContainer>
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
