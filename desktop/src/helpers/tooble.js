import React, { ReactNode, ReactElement } from 'react';
import createReactContext, { Context } from 'create-react-context';


const defaultState = {
  columns: [],
  data: []
};

const { Provider: ToobleProvider, Consumer: ToobleConsumer } = createReactContext(defaultState);


export class Tooble extends React.Component{
  state = {
    data: this.props.data,
    columns: this.props.columns
  }
  render() {
    return (
      <ToobleProvider value={this.state}>        
        {this.props.children}
      </ToobleProvider>
    );
  }
}

export function ToobleWrapper(WrappedComponent) {
  return function Wrapper(props:any) {
    return(
      <ToobleConsumer>
        { value => (
          <WrappedComponent {...props} {...value} />
        )}
      </ToobleConsumer>
    );
  };
}

