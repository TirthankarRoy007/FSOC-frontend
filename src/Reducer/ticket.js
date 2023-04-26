import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const ticketSlice = createSlice({
  name: "ticket1",
  initialState: {
    loading: false,
    error: null,
    updatedTicket: null,
    data: [],
    deletedTicket: null,
    isAuthenticated: false,
  },
  
  reducers: {
    createTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTicketSuccess: (state, action) => {
      state.loading = false;
      state.tickets.push(action.payload);
      state.isAuthenticated = true;
    },
    createTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    updateTicketRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTicketSuccess: (state, action) => {
      state.loading = false;
      state.updatedTicket = action.payload;

      // find the index of the updated ticket in the tickets array
      const ticketIndex = state.tickets.findIndex(t => t._id === action.payload._id);

      // if the ticket is found, update its title and description
      if (ticketIndex !== -1) {
        state.tickets[ticketIndex].title = action.payload.title;
        state.tickets[ticketIndex].description = action.payload.description;
      }
    },
    updateTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTicketRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteTicketSuccess: (state, action) => {
      state.loading = false;
      state.deletedTicket = action.payload;
    },
    deleteTicketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const getTickets = createAsyncThunk("getTickets", async (projectId) => {
    console.log("getTickets action dispatched with projectId:", projectId);
    const response = await api.get(`/getTickets/${projectId}`);
    console.log("getTickets API response:", response.data);
    return response.data;
  });
  
  
  export const ticketReducer = createSlice({
    name: "ticket2",
    initialState: {
      isLoading: false,
      tickets: [],
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getTickets.pending, (state) => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tickets = action.payload;
            state.error = null;
          })
          .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.tickets = [];
            state.error = action.error.message;
          });
      },      
  });
  