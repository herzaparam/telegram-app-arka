const initialState = {
    profilePage: false,
};
const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_PROFILE_PAGE":
            return {
                ...state,
                profilePage: true
            }
        case "CLOSE_PROFILE_PAGE":
            return {
                ...state,
                profilePage: false
            }
        default:
            return state;
    }

}
export default toggleReducer