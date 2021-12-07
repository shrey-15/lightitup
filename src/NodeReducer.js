import {
  SET_NODES,
  SET_INST_VALUE,
  SET_IO,
  SET_GLOBAL_TOGGLE,
  SET_GLOBAL_DIM,
} from "./Actions";

const node_reducer = (state, action) => {
  if (action.type === SET_NODES) {
    return {
      ...state,
      nodes: action.payload.nodes,
      total: action.payload.nodes.length,
    };
  }
  if (action.type === SET_INST_VALUE) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  if (action.type === SET_IO) {
    let allNodes = state.nodes;
    if (total > 0) {
      let obj = allNodes.find((node) => {
        return node.nodeID === action.payload.nodeID;
      });
      obj[action.payload.IOLine] = action.payload.value;
    }
    return { ...state, nodes: allNodes, total: allNodes.length };
  }
  if (action.type === SET_GLOBAL_TOGGLE) {
    let allNodes = state.nodes;
    allNodes.map((node) => {
      node.relay = action.payload.value;
    });
    return { ...state, nodes: allNodes, total: allNodes.length };
  }
  if (action.type === SET_GLOBAL_DIM) {
    let allNodes = state.nodes;
    allNodes.map((node) => {
      node.dim = action.payload.value;
    });
    return { ...state, nodes: allNodes, total: allNodes.length };
  }
};

export default node_reducer;
