import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber, password, setPassword }}>
      {children}
    </UserContext.Provider>
  );
};