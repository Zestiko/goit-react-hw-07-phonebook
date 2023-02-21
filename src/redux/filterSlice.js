import { createSlice} from '@reduxjs/toolkit';

const filterInitialState = {
  filter: ''
};

const filteredSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setSerch: {
      reducer(state, { payload }) {
        state.filter = payload;
      } 
    },
  },
});
export const { setSerch } = filteredSlice.actions;
export const filtersReducer = filteredSlice.reducer;
export const getFilterValue = state => state.filter.filter;