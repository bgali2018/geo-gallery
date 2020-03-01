const initState = [];
export default (state = initState, action) => {
    console.log('action in reducer',action);
    switch (action.type) {
        case 'ADD_TO_FAV_LIST':
            return [...state,
        ...action.payload];
        default:
            return state;
    }
};