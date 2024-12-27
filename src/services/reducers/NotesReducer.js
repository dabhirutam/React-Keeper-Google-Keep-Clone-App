
const intialState = {
    notes: [],
    note: null,
    isCreated: false,
    isUpdated: false,
    isLoading: false
}

const NotesReducer = (state = intialState, action) => {
    switch (action.type) {

       case "VIEW_NOTES_SUC":
            return { ...state,  notes: action.payload, note: null, isUpdated: false, isCreated: false }

       case "ADD_NOTES_SUC":
            return { ...state, isLoading: false, isCreated: true }

       case "SINGLE_NOTES_SUC":
            return { ...state, note: action.payload }

       case "UPDATE_NOTES_SUC":
            return { ...state, isUpdated: true, isLoading: false, note: null }

       case "LOADING":
            return { ...state, isLoading: true }

        default:
            return state
    }
}

export default NotesReducer;