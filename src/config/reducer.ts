import { SET_CURRENT_PAGE } from "./actions";

interface AppState {
    currentPage: string;
  }
  
  const initialState: AppState = {
    currentPage: '/',
  };
  
  const reducer = (state = initialState, action: any): AppState => {
    switch (action.type) {
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  