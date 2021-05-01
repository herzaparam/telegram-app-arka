export const showProfile = () => (dispatch) => {
    dispatch({ type: "SHOW_PROFILE_PAGE" })
}
export const closeProfile = () => (dispatch) => {
    dispatch({ type: "CLOSE_PROFILE_PAGE" })
}
export const openTabChat = (dataRoom) => (dispatch) =>{
    console.log(dataRoom);
    dispatch({type: "OPEN_CHAT_TAB", payload : dataRoom })
}