import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../Actions/Project";
import "./createProject.css";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
       dispatch(createProject(name));
      setName("");
      window.location.href = "/Home";
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Create Project</button>
    </form>
  );
};

export default ProjectForm;
