import { v4 as uuidv4 } from 'uuid';

const initState = [
    {
        title: "Backlog",
        id: uuidv4(),
        cards: []
    },
    {
        title: "Todo",
        id: uuidv4(),
        cards: []
    }
];

const listReducer = (state = initState, action) => {
    switch(action.type){
        case "ADD_CARD":
            const newCard = {
                id: uuidv4(),
                text: action.payload.text
            }
            const newState = state.map(list => {
                if(list.id === action.payload.id){
                    return{
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                }else{
                    return list;
                }
            })
            return newState;
        case "ADD_LIST":
            const newList = {
                title: action.payload,
                cards: [],
                id: uuidv4()
            }
            return [...state, newList]
        case "UPDATE_LIST_TITLE":{
            const newState = state.map(list => {
                if(list.id === action.payload.id){
                    return{
                        ...list,
                        title: action.payload.title
                    }
                }else{
                    return list;
                }
            })
            return newState;
        }
        case "DRAG_HAPPENED":{
            const {droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, type} = action.payload;
            const newState = [...state];

            //drag list
            if(type === "list"){
                const list = newState.splice(droppableIndexStart, 1);
                newState.splice(droppableIndexEnd, 0, ...list);
                return newState;
            }

            //in the same list
            if(droppableIdStart === droppableIdEnd){
                //init list 
                const list = state.find(list => droppableIdStart === list.id);
                //pull the card that was dragged
                const card = list.cards.splice(droppableIndexStart,  1);
                //update the position in the list
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }

            //to other lists
            if(droppableIdStart !== droppableIdEnd){
                //find list where drag happened
                const listStart  = state.find(list => droppableIdStart === list.id);
                //pull the card from prev list
                const card = listStart.cards.splice(droppableIndexStart, 1);
                //find list where drag ended
                const listEnd = state.find(list => droppableIdEnd === list.id);
                //add the card to new list
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }

            return newState;
        }
        default:
            return state;
    }
}

export default listReducer;