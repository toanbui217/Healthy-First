let defaultState = {
  email: "admin@gmail.com",
  password: "123456",
  username: "admin",
  avatar_url:
    "https://i.pinimg.com/474x/76/80/76/7680768d2115009e96ad70bd57146e74.jpg",
  active: true,
  // active: false,
};

let userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
