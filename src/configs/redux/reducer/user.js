const initialState = {
    user: {},
    loading: false,
    error: ""
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_UP_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "SIGN_UP_SUCCESS":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
                loading: false,
            };
        case "SIGN_UP_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "LOGIN":
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                }
            };
            case "UPDATE":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...action.payload
                    }
                }
                case "GET_USER_LOGIN":
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...action.payload
                    }
                }
        default:
            return state
    }
};

export default userReducer;