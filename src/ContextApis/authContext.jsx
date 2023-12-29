import axios from "axios";
import { createContext ,useEffect, useState } from "react";

const AuthContext = createContext();

export const ProvidAuthercontext = (props) => {
  
  const [Users, setUsers] = useState([]);
  const { children } = props;

  useEffect(() => {
    let getusers = () => {
      axios
        .get("http://localhost:3020/doctors")
        .then((res) => setUsers(res.data))
        .catch((err) => console.log(err));
    };
    getusers();
  }, []);

  return (
    <AuthContext.Provider value={{Users}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
