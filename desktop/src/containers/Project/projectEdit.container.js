import React, { useEffect } from 'react';
import moment from 'moment';
import { projectValidation } from 'constants/formValidation';
import ProjectEdit from 'components/forms/Project/projectEdit';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { projectActions } from 'store/actions';
import axios from 'helpers/axios';

const ProjectEditContainer = ({
  selected,
  categories,
  subcategories,
  tasks
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/projects/${selected.id}/projectTasks?filter[include][activities]`)
      .then(({ data }) => {
        console.log(data);
      });
  }, [selected]);

  const removeProject = () =>
    dispatch(projectActions.removeProject(selected.id));

  const updateProject = project =>
    dispatch(projectActions.updateProject(project));

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
        projectTasks: selected.projectTasks.map(projectTask => {
          return {
            ...projectTask,
            subcategoryId: projectTask.task.subcategoryId,
            categoryId: projectTask.task.category.id
          };
        })
      }}
      validationSchema={projectValidation}
      onSubmit={(values, formikFunctions) => {
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
          },
          e => {
            formikFunctions.setStatus({ success: false });
            formikFunctions.setSubmitting(false);
            formikFunctions.setErrors({ submit: e });
          }
        );
      }}
      render={formikProps => {
        return (
          <ProjectEdit
            categories={categories}
            subcategories={subcategories}
            tasks={tasks}
            removeProject={removeProject}
            {...formikProps}
          />
        );
      }}
    />
  );
};

export default ProjectEditContainer;
