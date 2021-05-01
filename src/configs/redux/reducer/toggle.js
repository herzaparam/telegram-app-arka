const initialState = {
    profilePage: false,
    chatTab: {},
    chatDisplay: false
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
        case "OPEN_CHAT_TAB":
            return {
                ...state,
                chatTab: {
                    ...action.payload
                },
                chatDisplay: true
            }
        default:
            return state;
    }

}
export default toggleReducer