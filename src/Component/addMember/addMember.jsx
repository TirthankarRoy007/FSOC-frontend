import { useState } from "react";
import axios from "axios";

const AddMemberForm = ({ projectId }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/projects/${projectId}/members`, {
        memberId: email,
      });

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={handleEmailChange} />
      </label>
      <button type="submit">Add Member</button>

      {error && <p>{error}</p>}
      {success && <p>Member added to project.</p>}
    </form>
  );
};

export default AddMemberForm;
