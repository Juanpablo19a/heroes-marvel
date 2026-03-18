import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from './authReducer';
import { types } from "../types/types";
import { supabase } from "../../supabase/config";


// const initialState = {
//     logged: false,
    
// }

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user: user
  }
}


export const AuthProvider = ({ children }) => {
    
  const [authState, dispatch] = useReducer(authReducer, {} ,init);

  const login = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error en login:", error.message);
      return { ok: false, errorMessage: error.message };
    }

    const user = {
      id: data.user.id,
      name: data.user.user_metadata?.full_name || data.user.email,
    };

    const action = {
      type: types.login,
      payload: user
    }

    localStorage.setItem('user', JSON.stringify(user));
    dispatch(action);

    return { ok: true };
  }

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    const action = {
      type: types.logout
    }
    dispatch(action);    
}





  return (
    <AuthContext.Provider value={{
      ...authState,
      //metodos
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
