import React, {Component} from 'react';

export const SymptomContext = React.createContext({});

export const SymptomConsumer = SymptomContext.Consumer;

export class SymptomProvider extends Component {
  state = {
    symptom: {},
  };

  render() {
    return (
      <SymptomContext.Provider
        value={{
          symptom: this.state.symptom,
          updateSymptom: newValue => {
            this.setState(
              {
                symptom: {
                  ...this.state.symptom,
                  ...newValue,
                },
              },
              () => {
                console.log('SymptomContext: ', this.state.symptom);
              },
            );
          },
        }}>
        {this.props.children}
      </SymptomContext.Provider>
    );
  }
}
