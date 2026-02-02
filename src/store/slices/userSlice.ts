import { createSlice } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  email: string;
};

const initialState: User | null = null;

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
});

// export const {} = slice.actions;

export default userSlice.reducer;

