export const showProfile = () => (dispatch) => {
    dispatch({ type: "SHOW_PROFILE_PAGE" })
}
export const closeProfile = () => (dispatch) => {
    dispatch({ type: "CLOSE_PROFILE_PAGE" })
}