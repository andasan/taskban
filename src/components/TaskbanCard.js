import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import { Draggable } from "react-beautiful-dnd";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import styled from "styled-components";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import TaskbanModal from "./TaskbanModal";

const CardContainer = styled.div`
  margin-bottom: 8px;
  position: relative;

  &:hover{
      cursor: pointer;
  }
`;

const InfoButton = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const TaskbanCard = ({ text, id, index, listId }) => {
    const [toggleHover, setToggleHover] = useState(false);

    return (
        <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
                <CardContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Popup
                        trigger={
                            <Card
                                onMouseEnter={() => setToggleHover(true)}
                                onMouseLeave={() => setToggleHover(false)}
                                style={{backgroundColor:"#F1F3FFFF"}}
                            >
                                <InfoButton>
                                    {toggleHover && (
                                        <InfoButton><MoreHorizIcon /></InfoButton>
                                    )}
                                </InfoButton>
                                <CardContent style={{ marginTop: "12px" }}>
                                    <Typography color="textSecondary" gutterBottom>
                                        {text}
                                    </Typography>
                                </CardContent>
                            </Card>
                        }
                        modal
                        nested
                    >
                        {close => (
                            <TaskbanModal close={close} text={text} listId={listId} cardId={id} />
                        )}
                    </Popup>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default TaskbanCard;
