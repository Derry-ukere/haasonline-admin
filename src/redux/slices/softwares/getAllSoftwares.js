// firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs,orderBy, collection, query,where } from 'firebase/firestore';

import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../../store';
import { FIREBASE_API } from '../../../config';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  allUserSoftwares : []
};

const slice = createSlice({
  name: 'softwares',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    success(state, action) {
        state.isLoading = false;
        state.allUserSoftwares = action.payload;
    },
}
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading} = slice.actions;

// ----------------------------------------------------------------------



export function getAllSoftwares() {
  return async () => {
    dispatch(slice.actions.startLoading());
    const container = [];
    try {
      const q = query(collection(DB, 'user-softwares'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        container.push(doc.data());
      });
      dispatch(slice.actions.success(container));
      
    } catch (error) {
      const errorMessage = error.message;
      dispatch(slice.actions.hasError(errorMessage));
    }
  };
}






