import React, { Component } from 'react';

import PropTypes from 'prop-types';
import PrivateRouteWithSubRoutes from 'routes/privateRouteWithSubRoutes';

export class RouteMapper extends Component {
  render() {
    return (
      <div>{this.props.routes.map((route, i) => <PrivateRouteWithSubRoutes key={i} component={route.component} {...route} />)}</div>
    );
  }
}

RouteMapper.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default RouteMapper;