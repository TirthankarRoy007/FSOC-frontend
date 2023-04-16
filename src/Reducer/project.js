import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    error: null,
    projects: [],
  },
  reducers: {
    createProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProjectSuccess: (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
      state.isAuthenticated = true
    },
    createProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false
    },
  },
});

export const fetchProject = createAsyncThunk('fetchProject', async () => {
  const response = await fetch("http://localhost:4000/getProject")
  const data = await response.json()
  return data
})

export const projectReducer = createSlice({
  name: "projects",
  initialState: {
    isLoading: false,
    data: null,
    isError: false
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProject.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProject.fulfilled, (state, action) => {
      ;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProject.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  }
});