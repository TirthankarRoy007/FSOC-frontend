import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTicket } from '../../Actions/Ticket';
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

function UpdateTicket() {
  const dispatch = useDispatch();
  const { ticketId, projectId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpdate = () => {
    const updatedTicket = {
      title,
      description,
    };
    dispatch(updateTicket(updatedTicket, ticketId, projectId));
    // Clear input fields
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
}

export default UpdateTicket;