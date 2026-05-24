const jobSlice  = createSlice({
    name: 'job',
    initialState: {
        jobs: [],
        loading: false,
        error: null,
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.jobs = action.payload;
        }
    }
});

export const { setAllJobs } = jobSlice.actions;
export default jobSlice.reducer;