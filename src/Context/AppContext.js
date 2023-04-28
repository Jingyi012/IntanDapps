import React, { useState, createContext } from "react";
//create a new context called as AppContext
const AppContext = createContext(null);
function AppContextProvider({ children }) {
    
    const [ account, setAccount ] = useState(null);

    // Put exposed states here
    const state = {
        account, 
        setAccount,
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