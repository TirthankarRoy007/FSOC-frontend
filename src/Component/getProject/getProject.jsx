import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../../Reducer/project";
import "./getProject.css"

const ProjectsList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state)=>state.projects);
  
 console.log("State", state);

//   console.log(state?.user);

  if(state?.data?.loading){
    return <h1>Loading...</h1>;
  }

  return (
    <div className="ProjectList">
      <button onClick={(e)=>dispatch(fetchProject())}>Fetch Project</button>
      {state?.data && state?.data.map((e)=> <li>{e.name}</li>)}
    </div>
  )
}

export default ProjectsList
