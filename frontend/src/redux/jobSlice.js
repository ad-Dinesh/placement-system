import { createSlice } from "@reduxjs/toolkit";
const jobSlice  = createSlice({
    name: 'job',
    initialState: {
        jobs: [],
        adminJobs: [],
        loading: false,
        error: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.jobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.adminJobs = action.payload;
        }
    }
});

export const { setAllJobs, setAllAdminJobs } = jobSlice.actions;
export default jobSlice.reducer;