import React, { createContext, useState, useContext } from 'react';

// Создаем контекст
const FiltersContext = createContext();

// Хук для использования контекста
export const useFilters = () => useContext(FiltersContext);

// Провайдер контекста
export const FiltersProvider = ({ children }) => {
    const [filters, setFilters] = useState({
        name: ""
    });

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <FiltersContext.Provider value={{ filters, updateFilter }}>
            {children}
        </FiltersContext.Provider>
    );
};
