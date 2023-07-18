import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Formik } from 'formik';
import { Typography } from '@material-ui/core';

import Subcategory from '~/components/forms/Subcategory';
import { subcategorySelectors, categorySelectors } from '~/store/selectors';
import { subcategoryActions } from '~/store/actions';
import { analyzeStatus } from '~/constants/analyze';
import Hero from '~/components/layouts/Hero';
import { subcategoryValidation } from '~/constants/formValidation';

export class SubcategoryDetail extends Component {
  removeSubcategory = () => {
    const { selected, removeSubcategory } = this.props;
    removeSubcategory(selected.id);
  };

  render() {
    const { selected, status, categories } = this.props;

    if (status === analyzeStatus.INIT) {
      return (
        <Hero fullWidth fullHeight>
          <Typography variant="h6">Select a Subcategory.. </Typography>
        </Hero>
      );
    }

    if (status === analyzeStatus.ADDING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            type: ``,
            categoryId: -1,
            dimensionId: 1
          }}
          validationSchema={subcategoryValidation}
          onSubmit={(values, formikFunctions) => {
            const { createSubcategory } = this.props;
            return createSubcategory({
              ...values,
              category: undefined,
              dimension: undefined
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
              <Subcategory
                label="Add"
                type="add"
                categories={categories}
                {...formikProps}
              />
            );
          }}
        />
      );
    }

    if (status === analyzeStatus.EDITING) {
      return (
        <Formik
          enableReinitialize
          initialValues={{
            ...selected
          }}
          validationSchema={subcategoryValidation}
          onSubmit={(values, formikFunctions) => {
            const { updateSubcategory } = this.props;
            return updateSubcategory({
              ...values,
              category: undefined,
              dimension: undefined
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
              <Subcategory
                removeSubcategory={this.removeSubcategory}
                label="Edit"
                type="edit"
                categories={categories}
                {...formikProps}
              />
            );
          }}
        />
      );
    }
  }
}

/* istanbul ignore next */
const mapStateToProps = state => {
  return {
    categories: categorySelectors.getAllCategories(state),
    subcategories: subcategorySelectors.getAllSubcategories(state),
    selected: subcategorySelectors.getSelectedSubcategory(state),
    status: state.analyze.subcategoryStatus
  };
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return {
    createSubcategory: subcategory => {
      return dispatch(subcategoryActions.createSubcategory(subcategory));
    },
    updateSubcategory: subcategory => {
      return dispatch(subcategoryActions.updateSubcategory(subcategory));
    },
    removeSubcategory: subcategory => {
      return dispatch(subcategoryActions.removeSubcategory(subcategory));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryDetail);
