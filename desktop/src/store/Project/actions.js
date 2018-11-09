import { projectActionTypes } from 'constants/actionTypeConstants';

import * as endpoint from './endpoints';
import { normalize } from 'normalizr';
import { projectArray } from 'store/schemas';
import * as schemas from 'store/schemas';
import { snackActions, projectTaskActions,analyzeActions } from 'store/actions';
import * as status from 'constants/status';

export const getProjects = () => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.GET_PROJECTS_REQUEST });
    try {
      const response = await endpoint.getProjects();
      // console.log(response.data);
      const payload = normalize({ projects: response.data }, projectArray);
      // console.log(response,payload);
      return dispatch({
        type: projectActionTypes.GET_PROJECTS_SUCCESS,
        payload
      });
      // console.log(response);
    } catch (e) {
      dispatch({
        type: projectActionTypes.GET_PROJECTS_FAILURE,
        payload: e
      });
      throw e;
    }
  };
};


export const createProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.CREATE_PROJECT_REQUEST });
    try {

      const response = await dispatch(postProject(project));
      console.log('create project',response);
      for(const projectTask of project.projectTasks){
        projectTask.projectId = response.data.id;
        await dispatch(projectTaskActions.postProjectTask(projectTask));
      }
      await dispatch(analyzeActions.selectProject(response.data.id));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Created'));
      return dispatch({ type: projectActionTypes.CREATE_PROJECT_SUCCESS });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectActionTypes.CREATE_PROJECT_FAILURE,payload: e });
    }
  };
};

export const postProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.POST_PROJECT_REQUEST });
    try {
      const response = await endpoint.postProject(project);
      const payload = normalize({ projects: [response.data] }, schemas.projectArray);    
      return dispatch({ type: projectActionTypes.POST_PROJECT_SUCCESS,payload, data: response.data });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectActionTypes.POST_PROJECT_FAILURE,payload: e });
    }
  };
};

export const updateProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await dispatch(putProject(project));
      
      const { data } = await endpoint.getProjectTasksByProjectId(project);
      console.log(data);
      for(const projectTaskInDb of data){
        if(!project.projectTasks.find(ele => ele.id === projectTaskInDb.id)){
          await dispatch(projectTaskActions.deleteProjectTask(projectTaskInDb));
        }
      }
      for(const projectTask of project.projectTasks){
        if(projectTask.id){
          projectTask.projectId = response.data.id;          
          await dispatch(projectTaskActions.putProjectTask(projectTask));
        }else{
          projectTask.projectId = response.data.id;          
          await dispatch(projectTaskActions.postProjectTask(projectTask));
        }
        
      }
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Updated'));
      return dispatch({ type: projectActionTypes.UPDATE_PROJECT_SUCCESS });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectActionTypes.UPDATE_PROJECT_FAILURE,payload: e });
    }
  };
};
export const putProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.PUT_PROJECT_REQUEST });
    try {
      const response = await endpoint.putProject(project.id,project);
      const payload = normalize({ projects: [response.data] }, schemas.projectArray);    
      return dispatch({ type: projectActionTypes.PUT_PROJECT_SUCCESS,payload, data: response.data });
    } catch (e) {
      console.log(e);
      return dispatch({ type: projectActionTypes.PUT_PROJECT_FAILURE,payload: e });
    }
  };
};
export const deleteProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.DELETE_PROJECT_REQUEST });
    try {
      await endpoint.deleteProject(project);
      //const payload = normalize({ projects: [response.data] }, schemas.projectArray);

      await dispatch(
        snackActions.openSnack(status.SUCCESS, 'Project deleted'),
      );

      const deleted = {
        entities:{
          projects: [project.id]
        },
        result: {
          projects: [project.id]
        }
      };

      return dispatch({
        type: projectActionTypes.DELETE_PROJECT_SUCCESS,
        deleted
      });
    } catch (e) {
      console.log(e);
      await dispatch(
        snackActions.openSnack(status.FAILURE, 'Project deletion failed!'),
      );
      return dispatch({
        type: projectActionTypes.DELETE_PROJECT_FAILURE,
        payload: e
      });
    }
  };
};