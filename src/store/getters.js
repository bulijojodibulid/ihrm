export default {
    token: state => state.user.token,
    userId: state => state.user.userInfo.userId,
    userName: state => state.user.userInfo.userName,
}