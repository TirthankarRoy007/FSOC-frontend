import { api } from "../api/api";

export const createProject = (name) => async (dispatch) => {
    try {

      dispatch({
        type: 'createProjectRequest'
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const body = JSON.stringify({ name });
  
      const res = await api.post("/createProject", body, config);
  
      dispatch({
        type: 'createProjectSuccess',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'createProjectFailure',
        payload: err.response.data.message
      });
    }
  };

export const getAllProjects = () => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllProjectRequest'
    });

    const res = await api.get("/getProject");

    dispatch({
      type: 'getAllProjectSuccess',
      payload: res.data.tickets
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'getAllProjectFailure',
      payload: err.response.data.message
    });
  }
}

export const updateProject = (name, projectId) => async (dispatch) => {
  try {
    dispatch({
      type: "updateProjectRequest",
    });

    const { data } = await api.put(`/updateProject/${projectId}`, { name });

    dispatch({
      type: "updateProjectSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "updateProjectFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProjectRequest",
    });

    const response = await api.delete(`/deleteProject/${projectId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    dispatch({
      type: "deleteProjectSuccess",
      payload: projectId,
    });
  } catch (error) {
    dispatch({
      type: "deleteProjectFailure",
      payload: error.message,
    });
  }
};

export const addMember = (projectId, memberId) => async (dispatch) => {
  try {
    dispatch({
      type: "addMemberToProjectRequest",
    });

    const response = await api.post(`/addMembers/${projectId}`, {
      memberId
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedProject = await response.json();

    dispatch({
      type: "addMemberToProjectSuccess",
      payload: updatedProject,
    });
  } catch (error) {
    dispatch({
      type: "addMemberToProjectFailure",
      payload: error.message,
    });
  }
};

export const removeMember = (projectId, memberId) => async (dispatch) => {
  try {
    dispatch({
      type: "removeMemberFromProjectRequest",
    });

    const response = await api.delete(`/removeMembers/${projectId}`, {
      data: { memberId }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedProject = await response.json();

    dispatch({
      type: "removeMemberFromProjectSuccess",
      payload: updatedProject,
    });
  } catch (error) {
    dispatch({
      type: "removeMemberFromProjectFailure",
      payload: error.message,
    });
  }
};

