import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets } from '../../Actions/Ticket';
import { Link, useParams } from 'react-router-dom';
import { Paper, Typography, Button } from '@material-ui/core';

function TicketList() {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    dispatch(getTickets(projectId));
  }, [dispatch, projectId]);

  const { tickets, isLoading, error } = useSelector((state) => state.ticket2);

  return (
    <div>
      {isLoading && <p>Loading tickets...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && tickets.length === 0 && <p>No tickets found.</p>}
      {!isLoading && tickets.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {tickets.map((ticket) => (
            <Paper
              key={ticket.id}
              elevation={3}
              style={{
                width: '250px',
                height: '200px',
                margin: '10px',
                padding: '10px',
              }}
            >
              <Typography variant="h6" component="h3">
                Title
              </Typography>
              <Typography variant="subtitle1" component="p">
                {ticket.title}
              </Typography>
              <br />
              <Typography variant="h6" component="h3">
                Description
              </Typography>
              <Typography variant="subtitle1" component="p">
                {ticket.description}
              </Typography>
              <br />
              <Link to={`/updateTicket/${ticket._id}/${projectId}`}>
                <Button variant="contained" color="primary">
                  Update
                </Button>
              </Link>
              <Link to={`/deleteTicket/${projectId}/${ticket._id}`}>
                <Button variant="contained" color="primary">
                  Delete
                </Button>
              </Link>

            </Paper>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketList;
