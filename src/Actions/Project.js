import axios from "axios";

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
  
      const res = await axios.post("https://thundering-quill-shop.glitch.me/createProject", body, config);
  
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

    const res = await axios.get("https://thundering-quill-shop.glitch.me/getProject");

    dispatch({
      type: 'getAllProjectSuccess',
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'getAllProjectFailure',
      payload: err.response.data.message
    });
  }
}
