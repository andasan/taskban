import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextArea from "react-textarea-autosize";
import styled from "styled-components";

const FormButtonGroup = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
`;

const AddFormButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 3px;
    height: 36px;
    width: 285px;
    &:hover {
        background-color: black !important;
        color: white !important;
    }
`;

const TaskbanActionButton = (props) => {
    const [formOpen, setFormOpen] = useState(false);
    const [formText, setFormText] = useState("");

    const dispatch = useDispatch()

    const handleInputForm = (e) => {
        setFormText(e.target.value)
    }

    const handleAddCard = () => {
        if (formText) {
            dispatch({
                type: "ADD_CARD",
                payload: {
                    text: formText,
                    id: props.listId
                }
            });
            setFormText('');
        }
        return;
    }

    const handleAddList = () => {

        if (formText) {
            dispatch({
                type: "ADD_LIST",
                payload: formText
            });
            setFormText('');
        }
        return;
    }

    const handleCloseForm = () => {
        setFormOpen(false);
        setFormText('')
    }

    const renderAddButton = () => {
        const { list } = props;

        const buttonText = list ? "Add another list" : "Add another card";
        const buttonTextOp = list ? 1 : 0.5;
        const buttonTextColor = list ? "white" : "inherit";
        const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";

        return (
            <AddFormButton
                onClick={() => setFormOpen(true)}
                style={{
                    opacity: buttonTextOp,
                    color: buttonTextColor,
                    backgroundColor: buttonTextBackground,
                }}
            >
                <Icon>add</Icon>
                <p>{buttonText}</p>
            </AddFormButton>
        );
    };

    const renderForm = () => {
        const { list } = props;

        const placeholder = list ? "Enter list title..." : "Enter a title for this card...";
        const buttonTitle = list ? "Add List" : "Add Card";

        return (
            <div>
                <Card style={{
                    overflow: "visible",
                    minHeight: 85,
                    minWidth: 272,
                    padding: "6px 8px 2px"
                }}>
                    <TextArea
                        placeholder={placeholder}
                        autoFocus
                        onBlur={() => setFormOpen(false)}
                        value={formText}
                        onChange={e => handleInputForm(e)}
                        style={{
                            resize: "none",
                            width: "100%",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <FormButtonGroup>
                    <Button
                        onMouseDown={list ? handleAddList : handleAddCard}
                        variant="contained"
                        style={{
                            color: "white",
                            backgroundColor: "#5aac44"
                        }}
                    >{buttonTitle} </Button>
                    <Icon style={{ marginLeft: 8, cursor: "pointer" }} onClick={()=>handleCloseForm()}>close</Icon>
                </FormButtonGroup>
            </div>
        );
    };

    return formOpen ? renderForm() : renderAddButton();
};

export default TaskbanActionButton;
