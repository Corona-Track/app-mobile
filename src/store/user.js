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
                console.log(this.state.user);
              },
            );
          },
        }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

// export const UserProvider = ({children}) => {
//   const [user, setUser] = useState({});

//   const updateUser = useCallback(
//     newValue => {
//       setUser(prevValue => [...prevValue, newValue]);
//     },
//     [setUser],
//   );

//   const value = {
//     user,
//     updateUser,
//   };

//   return <Context.Provider value={value}>{children}</Context.Provider>;
// };

// export const useUserStore = () => React.useContext(Context);
