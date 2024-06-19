import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [suserId, setUserId] = useState(null);
    const [suserPolicyId, setUserPolicyId] = useState(null);

    return (
      <UserContext.Provider value={{ suserId, setUserId, suserPolicyId, setUserPolicyId }}>
            {children}
        </UserContext.Provider>
    );
};