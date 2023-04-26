import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeMember } from '../../Actions/Project';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const RemoveMemberForm = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberId.trim()) {
      dispatch(removeMember(projectId, memberId));
      setMemberId('');
      window.location.href = "/getProject"
    }
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Member ID"
            fullWidth
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
            Remove Member
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RemoveMemberForm;
