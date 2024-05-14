export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

export interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: string;
}

export const setCurrentPage = (page: string): SetCurrentPageAction => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});
