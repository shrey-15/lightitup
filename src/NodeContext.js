import React, { useContext, useReducer } from "react";
import reducer from "./NodeReducer";
import {
  SET_NODES,
  SET_INST_VALUE,
  SET_IO,
  SET_GLOBAL_TOGGLE,
  SET_GLOBAL_DIM,
} from "./Actions";

const initialState = {
  nodes: [],
  total: 0,
};

const NodeContext = React.createContext();

export const NodeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setNodes = (nodes, total) => {
    dispatch({ type: SET_NODES, payload: { nodes, total } });
  };

  const setInstValues = (nodeID, curr, temp, intensity) => {
    dispatch({
      type: SET_INST_VALUE,
      payload: { nodeID, curr, temp, intensity },
    });
  };

  const setIO = (nodeID, IOLine, value) => {
    dispatch({
      type: SET_IO,
      payload: { nodeID, IOLine, value },
    });
  };

  const setGlobalToggle = (value) => {
    dispatch({
      type: SET_GLOBAL_TOGGLE,
      payload: { value },
    });
  };

  const setGlobalDim = (value) => {
    dispatch({
      type: SET_GLOBAL_DIM,
      payload: { value },
    });
  };

  return (
    <NodeContext.Provider
      value={{ ...state, setNodes, setInstValues, setIO, setGlobalToggle, setGlobalDim }}
    >
      {children}
    </NodeContext.Provider>
  );
};
// make sure use
export const useNodeContext = () => {
  return useContext(NodeContext);
};
