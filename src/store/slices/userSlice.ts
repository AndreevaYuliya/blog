import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
  posts: string[];
};

const initialState: { user: User | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
