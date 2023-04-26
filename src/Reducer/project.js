import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    loading: false,
    error: null,
    projects: [],
    isAuthenticated: false,
  },
  reducers: {
    createProjectRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createProjectSuccess: (state, action) => {
      state.loading = false;
      state.projects.push(action.payload);
      state.isAuthenticated = true;
    },
    createProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    updateProjectRequest: (state) => {
      state.loading = true;
    },
    updateProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload 
      },
    updateProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProjectRequest: (state)=>{
      state.loading = true;
    },
    deleteProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = "Project Deleted Successfully";
    },
    deleteProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload
    },
    addMemberToProjectRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addMemberToProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = "Member added to Project Successfully";
      state.projects = action.payload
    },
    addMemberToProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    removeMemberFromProjectRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    removeMemberFromProjectSuccess: (state, action) => {
      state.loading = false;
      state.message = "Member removed from Project Successfully";
      state.projects = action.payload;
    },
    removeMemberFromProjectFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },    
  },
});

export const fetchProject = createAsyncThunk('fetchProject', async () => {
  const response = await fetch("https://great-standing-kitty.glitch.me/getProject")
  const data = await response.json()
  return data
})

export const projectReducer = createSlice({
  name: "projects",
  initialState: {
    isLoading: false,
    data: [],
    isError: null
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
