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

const TaskbanList = ({ listId, title, cards, index }) => {
    const [toggleHover, setToggleHover] = useState(false);

    return (
        <Draggable
            draggableId={String(listId)}
            index={index}
        >
            {(provided) => (
                <Container
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    onMouseEnter={() => setToggleHover(true)}
                    onMouseLeave={() => setToggleHover(false)}
                >
                    <Droppable droppableId={String(listId)}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <HeaderContainer>
                                    <h4 style={{ textTransform: "capitalize", padding: "8px 0" }}>{title}</h4>
                                    {toggleHover && <MoreHorizIcon />}
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
