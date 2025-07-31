import PropTypes from 'prop-types';
import React, { useMemo, useState, useContext, createContext } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const showLoader = () => setLoading(true);
    const hideLoader = () => setLoading(false);

    const value = useMemo(() => ({
        loading,
        showLoader,
        hideLoader,
    }), [loading]);

    return (
        <LoaderContext.Provider value={value}>
            {children}
        </LoaderContext.Provider>
    );
};

LoaderProvider.propTypes = {
    children: PropTypes.node, // Validate 'children'
};

export const useLoaderContext = () => useContext(LoaderContext);
