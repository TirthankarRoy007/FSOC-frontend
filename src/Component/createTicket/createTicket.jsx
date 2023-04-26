// TicketForm.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../../Actions/Ticket";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
} from "@material-ui/core";

const TicketForm = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      dispatch(createTicket({ title, description }, projectId));
      setDescription("");
      window.location.href = `/getTickets/${projectId}`
    }
  };

  return (
    <Card className="card-container" raised>
      <CardHeader title="Create Ticket" />
      <CardContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </CardContent>
    </Card>
  );
};

export default TicketForm;
