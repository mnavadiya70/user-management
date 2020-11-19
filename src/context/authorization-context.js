import React from 'react';

const context = React.createContext({
    isAuthenticated: false,
    login: () => {}
});

export default context;