import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";
import { Submission } from "../lib/applicationTypes";

export type SubmissionsSlice = {
  submissions: Submission[];
}

const initialState: SubmissionsSlice = {
  submissions: [{
    id: "b2b3d354-91f1-45a7-a7bf-41dd6544f81a",
    createdAt: new Date("August 19, 2023 23:15:30 GMT+00:00").toString(),
    reason: "Protomolecule experiment escaped lab, went ham on Ganymede, and destroyed our accounting dept.",
    listing: {
      id: "listing-5",
      name: "PROTOGEN",
      physicalAddress: {
        address1: "2143 Luna Ci.",
        address2: "",
        city: "Charlotte",
        state: "NC",
        zip: "13254"
      },
      mailingAddress: null
    },
  }],
};

const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<Submission>) => {
      state.submissions.push(action.payload);
    },
  },
});

export const {
  addSubmission,
} = submissionsSlice.actions;

// Selectors

export const selectSubmissions = ({ submissions }: RootState) =>
  submissions.submissions;

export default submissionsSlice;
