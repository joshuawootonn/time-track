import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { RouteWithSubRoutes } from './routeWithSubRoutes';

export class RouteMapper extends Component {
  render() {
    return (
      <div>
        {this.props.routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    );
  }
}

RouteMapper.propTypes = { routes: PropTypes.array.isRequired };

export default RouteMapper;
