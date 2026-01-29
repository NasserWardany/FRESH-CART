import { createContext, useState } from "react";
import PropTypes from "prop-types";


export const CounterContext = createContext(0);

export default function CounterContextProvider({ children }) {
    const [counter, setCounter] = useState(0);

    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    );
}

CounterContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
