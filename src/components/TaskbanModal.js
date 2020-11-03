import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import 'reactjs-popup/dist/index.css';
import EditableLabel from 'react-inline-editing';
import EditIcon from '@material-ui/icons/Edit';
import styled from "styled-components";

import "./TaskbanModal.css";

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

const TaskbanModal = ({ close, text, listId, cardId }) => {

    const dispatch = useDispatch();
    const editLabel = useRef();

    const handleEditButton = () => {
        if(!editLabel.current.state.isEditing){
            editLabel.current._reactInternals.child.child.pendingProps.onClick();
        }
    }

    const handleUpdateText = (value) => {
        console.log('value: ', value);
        
        dispatch({
            type: "UPDATE_CARD_TEXT",
            payload: {
                listId: listId,
                cardId: cardId,
                text: value
            }
        })
    }

    return (
        <div className="modal">
            <button className="close" onClick={close}>
                &times;
            </button>
            <div className="header">
            <EditableLabel
                ref={editLabel}
                text={text}
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='100%'
                inputHeight='25px'
                inputMaxLength={150}
                labelFontWeight='bold'
                inputFontWeight='bold'
                // onFocus={handleFocus}
                onFocusOut={(value) => handleUpdateText(value)}
                onEnterPress={(value) => handleUpdateText(value)}
            />
            <InfoButton onClick={handleEditButton}><EditIcon fontSize="small" /></InfoButton>
            </div>
            <div className="content">Test</div>
            <div className="actions">
                <button
                    className="button"
                    onClick={() => {
                        console.log('modal closed ');
                        close();
                    }}
                >
                    close modal
                </button>
            </div>
        </div>
    )
}

export default TaskbanModal
