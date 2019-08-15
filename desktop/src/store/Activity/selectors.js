import { createSelector } from "reselect";
import moment from 'moment';
import { getEmployeesFromEntities } from 'store/Employee/selectors';
import { getProjectTasksFromEntities } from 'store/ProjectTask/selectors';
import { getProjectsFromEntities } from 'store/Project/selectors';
import { getTasksFromEntities } from 'store/Task/selectors';

export const getActivitiesFromEntities = state => state.entities.activities;
export const getActivitiesFromResults = state => state.results.activities;


export const getShiftsFromEntities = state => state.entities.shifts;
export const getShiftsFromResults = state => state.results.shifts;


export const getAllActivities = createSelector(
  getShiftsFromEntities,
  getShiftsFromResults,  
  getActivitiesFromEntities,
  getEmployeesFromEntities,
  getProjectTasksFromEntities,
  getProjectsFromEntities,
  getTasksFromEntities,
  (_,props) => props ? props.sorts : null,
  (_,props) => props ? props.filters : null,
  (shiftsEntities, shiftResults, activityEntities,  employees, projectTasks, projects, tasks, sorts, filters) => {
    
    if(!shiftResults || shiftResults.length === 0){
      return null;
    }

    let list = [];
    shiftResults.forEach(shiftId => {
      const currentShift = shiftsEntities[shiftId];
      currentShift.activities.forEach(activityId => {
        const currentActivity = activityEntities[activityId];
        list.push({
          ...activityEntities[activityId],
          shift: currentShift,
          project: projects[projectTasks[currentActivity.projectTaskId].projectId],
          employee: employees[shiftsEntities[currentActivity.shiftId].employeeId],
          task: tasks[projectTasks[currentActivity.projectTaskId].taskId]
        });
      });
    });

    if(sorts){
      // TODO: Add sorting to getAllShifts
    }

    console.log("\n\n\n Filters: ", filters);
    console.log(list);
    
    if(filters){
      list = list.filter(activity => {   
        let decision = true;
        Object.keys(filters).forEach(key => {
          if(key === `startTime` &&  moment(activity.shift[`clockInDate`]).isBefore(moment(filters[key],`MM-DD-YY HH:mm:ss`))){
            decision = false;
          }
          if(key === `endTime` && moment(activity.shift[`clockInDate`]).isAfter(moment(filters[key],`MM-DD-YY HH:mm:ss`))){
            decision = false;
          }
          if( key === `employeeId` && filters[key] !== -1 && (filters[key] !== activity.shift[key])){
            decision = false;
          }   
          if( (key === `authorityId` || key === `crewId`) && filters[key] !== -1 && (filters[key] !== activity[`employee`][key])){
            decision = false;
          }
          if( key === `projectId` && filters[key] !== -1 && (filters[key] !== activity.project.id)){
            decision = false;           
          }  
        });
        return decision;
      }); 
    }    
    console.log(list);
    return list;
  }
);