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
`;

const InfoButton = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 5px;
`;

const TaskbanCard = ({ text, id, index }) => {
    const [toggleHover, setToggleHover] = useState(false);

    return (
        <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
                <CardContainer
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card
                        onMouseEnter={() => setToggleHover(true)}
                        onMouseLeave={() => setToggleHover(false)}
                    >
                        <InfoButton>
                            {toggleHover && (
                                <Popup
                                trigger={<InfoButton><MoreHorizIcon /></InfoButton>}
                                modal
                                nested
                            >
                                {close => (
                                    <TaskbanModal close={close} />
                                )}
                            </Popup>
                            )}
                        </InfoButton>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                {text}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardContainer>
            )}
        </Draggable>
    );
};

export default TaskbanCard;
