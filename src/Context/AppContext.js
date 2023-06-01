import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
//create a new context called as AppContext
const AppContext = createContext(null);
function AppContextProvider({ children }) {

    const navigate = useNavigate();

    
    const [account, setAccount] = useState(JSON.parse(localStorage.getItem('account')) || null);

    const setAccountAndStore = (account) => {
        setAccount(account);
        localStorage.setItem('account', JSON.stringify(account));
    };


    // Put exposed states here
    const state = {
        account, 
        setAccount : setAccountAndStore,
        logout: () => {
            sessionStorage.clear();
            localStorage.clear();
            setAccount("");
            navigate("");
        }
    };



    return (
        //the state is paased to the AppContext.Provider component via value prop
        <AppContext.Provider value={ state } >
            {children}
        </AppContext.Provider>
    );
}


export { AppContextProvider }
export default AppContext;