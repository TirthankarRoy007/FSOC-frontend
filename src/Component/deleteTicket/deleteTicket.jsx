import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { deleteTicket } from '../../Actions/Ticket';

function DeleteTicket() {
  const dispatch = useDispatch();
  const { ticketId, projectId } = useParams();

  const handleDelete = () => {
    dispatch(deleteTicket(projectId, ticketId));
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete Ticket
      </Button>
    </div>
  );
}

export default DeleteTicket;
