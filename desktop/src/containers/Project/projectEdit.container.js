import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { projectEditValidation } from 'constants/formValidation';
import ProjectEdit from 'components/forms/Project/projectEdit';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { projectActions } from 'store/actions';
import axios from 'helpers/axios';
import Progress from 'components/helpers/Progress';

const ProjectEditContainer = ({ selected, tasks }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newSelected, setNewSelected] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/projects/${selected.id}/projectTasks?filter[include][activities]`)
      .then(({ data }) => {
        const projectTaskObject = Object.assign(
          {},
          ...data.map(projectTask => ({
            [projectTask.id]: projectTask
          }))
        );

        setNewSelected({
          ...selected,
          projectTasks: selected.projectTasks
            .filter(projectTask => projectTaskObject[projectTask.id])
            .map(projectTask => ({
              ...projectTask,
              activities: projectTaskObject[projectTask.id].activities,
              actualTime: projectTaskObject[projectTask.id].activities
                .map(activity => activity.length)
                .reduce((total, length) => total + length, 0),
              subcategoryId: projectTask.task.subcategoryId,
              categoryId: projectTask.task.category.id
            }))
        });

        setIsLoading(false);
      });
  }, [selected]);

  const removeProject = () =>
    dispatch(projectActions.removeProject(selected.id));

  const updateProject = project =>
    dispatch(projectActions.updateProject(project));

  if (isSubmitting) {
    return (
      <Progress
        message={'Updating project'}
        variant="circular"
        fullWidth
        fullHeight
      />
    );
  }
  if (isLoading) {
    return <Progress variant="circular" fullWidth fullHeight />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...selected,
        isActive: selected.isActive ? true : false,
        date: moment
          .utc(selected.date)
          .local()
          .startOf(`day`)
          .format(`YYYY-MM-DD`),
        projectTasks: newSelected.projectTasks
      }}
      validationSchema={projectEditValidation}
      onSubmit={(values, formikFunctions) => {
        setIsSubmitting(true);
        return updateProject({
          id: values.id,
          name: values.name,
          isActive: values.isActive ? 1 : 0,
          date: moment(values.date).format(`MM-DD-YY HH:mm:ss`),
          projectTasks: values.projectTasks
        }).then(
          () => {
            formikFunctions.resetForm();
            formikFunctions.setStatus({ success: true });
            setIsSubmitting(false);
          },
          e => {
            formikFunctions.setStatus({ success: false });
            formikFunctions.setSubmitting(false);
            formikFunctions.setErrors({ submit: e });
            setIsSubmitting(false);
          }
        );
      }}
      render={formikProps => (
        <ProjectEdit
          tasks={tasks}
          removeProject={removeProject}
          {...formikProps}
        />
      )}
    />
  );
};

export default ProjectEditContainer;
