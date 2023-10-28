import { createSlice } from '@reduxjs/toolkit';
import { getFirestore,doc,updateDoc, } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { FIREBASE_API } from '../../../config';
import { dispatch } from '../../store';

const firebaseApp = initializeApp(FIREBASE_API);
const DB = getFirestore(firebaseApp);

// -------------------------------------------------------//

const initialState = {
  isLoading: false,
  error: null,
  success: {
    approved: false,
    declined: false,
  },
};

const slice = createSlice({
  name: 'update-success-status',
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

    // Update  Candidate
    approveSuccess(state) {
      state.isLoading = false;
      state.success.approved = true;
    },

    // Update  Candidate
    declineSuccess(state) {
        state.isLoading = false;
        state.success.declined = true;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { hasError, startLoading, } = slice.actions;

// ----------------------------------------------------------------------

export  function setSoftwareStatus(options) {
  return async () => {
    const {id, actionType} = options;
    dispatch(slice.actions.startLoading());
    try {
        const depositRef = doc(DB, 'user-softwares', `${id}`);
        if(actionType === "decline_deposit"){
            await updateDoc(depositRef, {
                status: 'pending',
              });
              dispatch(slice.actions.declineSuccess());
        }
        if(actionType === "approve_deposit"){
          
            await updateDoc(depositRef, {
                status: 'approved',
              });
              dispatch(slice.actions.approveSuccess());        }
     
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
};
