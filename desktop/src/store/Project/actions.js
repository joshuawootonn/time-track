import { projectActionTypes } from 'constants/actionTypeConstants';

import endpoints from './endpoints';
import { snackActions, projectTaskActions,analyzeActions,genericActions } from 'store/actions';
import * as status from 'constants/status';
import domains from 'constants/domains';

export const getAllProjects = () => {
  return async dispatch => {
    dispatch(genericActions.getAll(domains.PROJECT));    
  };
};

export const createProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.CREATE_PROJECT_REQUEST });
    try {
      const response = await dispatch(genericActions.post(domains.PROJECT,project));
      for(const projectTask of project.projectTasks){
        projectTask.projectId = response.data.id;
        await dispatch(projectTaskActions.postProjectTask(projectTask));
      }
      await dispatch(analyzeActions.selectProject(response.data.id));
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Created'));
      return dispatch({ type: projectActionTypes.CREATE_PROJECT_SUCCESS });      
    } catch (e) {
      console.log(e);
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Creation Failed'));
      return dispatch({ type: projectActionTypes.CREATE_PROJECT_FAILURE });
    }
  };
};

export const updateProject = project => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.UPDATE_PROJECT_REQUEST });
    try {
      const response = await dispatch(genericActions.put(domains.PROJECT,project));
      const { data } = await endpoints.getProjectTasksByProjectId(project);
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
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Update Failed'));
      return dispatch({ type: projectActionTypes.UPDATE_PROJECT_FAILURE });
    }
  };
};

export const removeProject = id => {
  return async dispatch => {
    dispatch({ type: projectActionTypes.REMOVE_PROJECT_REQUEST });
    try {
      await dispatch(analyzeActions.deleteSelected(domains.PROJECT));
      await dispatch(genericActions.delet(domains.PROJECT,id));

      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Deleted'));
      return dispatch({ type: projectActionTypes.REMOVE_PROJECT_SUCCESS });      
    } catch (e) {
      console.log(e);
      await dispatch(snackActions.openSnack(status.SUCCESS, 'Project Deletion Failed'));
      return dispatch({ type: projectActionTypes.REMOVE_PROJECT_FAILURE });
    }
  };
};

