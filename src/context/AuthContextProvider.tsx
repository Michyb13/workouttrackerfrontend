import {
  Dispatch,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
} from "react";
type AuthProps = {
  children: ReactNode;
};

type AuthContextProviderProps = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

type AuthState = {
  token: string;
  userId: string;
  username: string;
};

type AuthAction =
  | { type: "Sign Up"; payload: AuthState }
  | { type: "Sign In"; payload: AuthState }
  | { type: "Sign Out" };

export const AuthContext = createContext<AuthContextProviderProps | null>(null);
const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "Sign Up":
      return { ...state, ...action.payload };
    case "Sign In":
      return { ...state, ...action.payload };
    case "Sign Out":
      return initialState;
    default:
      return state;
  }
};
const initialState: AuthState = {
  token: "",
  userId: "",
  username: "",
};

const AuthContextProvider = ({ children }: AuthProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //  useEffect(() => {
  //   const user = localStorage.getItem("user");
  //if (user) {
  //dispatch({ type: "Sign In", payload: JSON.parse(user) });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
