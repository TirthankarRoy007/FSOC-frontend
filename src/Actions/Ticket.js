  
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const createTicket = (ticketData, projectId) => async (dispatch) => {
    try {
      dispatch({
        type: 'createTicketRequest'
      });
  
      const res = await api.post(`/createTicket/${projectId}`, ticketData);
  
      dispatch({
        type: 'createTicketSuccess',
        payload: res.data.ticket
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'createTicketFailure',
        payload: err.response.data.message
      });
    }
  };

export const getTickets = createAsyncThunk("getTickets", async (projectId) => {
  const response = await api.get(`/getTickets/${projectId}`);
  return response.data.tickets;
});

export const updateTicket = (ticketData, ticketId, projectId) => async (dispatch) => {
  try {
    dispatch({
      type: 'updateTicketRequest'
    });

    // only include the fields that need to be updated
    const updatedTicketData = {
      title: ticketData.title,
      description: ticketData.description,
    };

    const res = await api.put(`/updateTicket/${ticketId}/${projectId}`, updatedTicketData);

    dispatch({
      type: 'updateTicketSuccess',
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'updateTicketFailure',
      payload: err.response.data.message
    });
  }
};

export const deleteTicket = (projectId, ticketId) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteTicketRequest',
    });

    const res = await api.delete(`/deleteTicket/${projectId}/${ticketId}`);

    dispatch({
      type: 'deleteTicketSuccess',
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'deleteTicketFailure',
      payload: err.response.data.message,
    });
  }
};
