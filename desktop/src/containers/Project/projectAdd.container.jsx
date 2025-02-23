import React from 'react'
import moment from 'moment'
import { projectValidation } from '~/constants/formValidation'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { projectActions } from '~/store/actions'
import ProjectAdd from '~/components/forms/Project/projectAdd'

const ProjectAddContainer = ({ categories, subcategories, tasks, trades }) => {
  const dispatch = useDispatch()

  const createProject = (project) =>
    dispatch(projectActions.createProject(project))

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: ``,
        jobNumber: ``,
        isActive: true,
        date: moment().startOf(`day`).format(`YYYY-MM-DD`),
        projectTasks: [],
      }}
      validationSchema={projectValidation}
      onSubmit={(values, formikFunctions) => {
        return createProject({
          name: values.name,
          jobNumber: values.jobNumber,
          isActive: values.isActive ? 1 : 0,
          date: moment(values.date).format(`MM-DD-YY HH:mm:ss`),
          projectTasks: values.projectTasks,
        }).then(
          () => {
            formikFunctions.resetForm()
            formikFunctions.setStatus({ success: true })
          },
          (e) => {
            formikFunctions.setStatus({ success: false })
            formikFunctions.setSubmitting(false)
            formikFunctions.setErrors({ submit: e })
          },
        )
      }}
      render={(formikProps) => {
        return (
          <ProjectAdd
            categories={categories}
            subcategories={subcategories}
            tasks={tasks}
            trades={trades}
            {...formikProps}
          />
        )
      }}
    />
  )
}

export default ProjectAddContainer
