
const intialState = {
    user: null,
    isSignUp: false,
    isSignIn: false,
    isLoading: false,
}

const AuthReducer = (state = intialState, action) => {
    switch (action.type) {

        case "SIGNUP_SUC":
            return { ...state, isLoading: false, isSignUp: true }

        case "CLOASE_SIGNUP":
            return { ...state, isSignUp: false }

        case "SIGNIN_SUC":
            return { ...state, isLoading: false, user:action.payload }

        case "LOGOUT_SUC":
            return { ...state, user: null }

        case "LOADING":
            return { ...state, isLoading: true }

        default:
            return state;
    }
}

export default AuthReducer;