import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import styled from "styled-components";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditableLabel from 'react-inline-editing';

import TaskbanCard from "./TaskbanCard";
import TaskbanActionButton from "./TaskbanActionButton";

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
  padding: 12px 0;
  height: 50px;
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
      cursor: pointer;
  }
`;

const TaskbanList = ({ listId, title, cards, index }) => {
    const [toggleHover, setToggleHover] = useState(false);

    const dispatch = useDispatch();

    const handleInfoButton = () => {
        //open overlay/popup
        console.log("clicked");
    }

    const handleUpdateTitle = (value, listId) => {
        dispatch({
            type:  "UPDATE_LIST_TITLE",
            payload: {
                id: listId,
                title: value
            }
        })
    }

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
                >
                    <Droppable droppableId={String(listId)}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <HeaderContainer>
                                    {/* <h4 style={{ textTransform: "capitalize", padding: "12px 0" }}>{title}</h4> */}
                                    <EditableLabel 
                                        text={title}
                                        labelClassName='myLabelClass'
                                        inputClassName='myInputClass'
                                        inputWidth='200px'
                                        inputHeight='25px'
                                        inputMaxLength={50}
                                        labelFontWeight='bold'
                                        inputFontWeight='bold'
                                        // onFocus={this._handleFocus}
                                        onFocusOut={(value) => handleUpdateTitle(value, listId)}
                                        onEnterPress={(value) => handleUpdateTitle(value, listId)}
                                    />
                                    {
                                        toggleHover && (
                                            <Popup trigger={<InfoButton onClick={handleInfoButton}><MoreHorizIcon /></InfoButton>} position="right center">
                                                <div>Popup content here !!</div>
                                            </Popup>
                                        )
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
