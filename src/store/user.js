import React, {Component} from 'react';

const UserContext = React.createContext({});

export const UserConsumer = UserContext.Consumer;

export class UserProvider extends Component {
  state = {
    user: {},
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          updateUser: newValue => {
            this.setState(
              {
                user: {
                  ...this.state.user,
                  ...{
                    ...newValue,
                    question: {
                      ...this.state.user.question,
                      ...newValue.question,
                      comorbiditiesSelected: newValue.question
                        ? newValue.question.comorbiditiesSelected
                        : [],
                    },
                  },
                },
              },
              () => {
                console.log('UserContext:', this.state.user);
              },
            );
          },
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
