﻿import { createSlice } from "@reduxjs/toolkit";

const GeneralStateSlice = createSlice({
    name: "generalState",
    initialState: {
        mainScreenItem: "",
        visibleMainScreen: false,
        notificationStatus: false,
        sidebarState: true,
        isFilterOpen:true,
    },
    reducers: {
        setScreenPage(state,action) {
            state.mainScreenItem = action.payload.mainScreenItem;

        },
        clearScreenPage(state) {
            state.mainScreenItem = "";
        },
        showScreenPage(state) {
            state.visibleMainScreen = true;
        },

        hideScreenPage(state) {
            state.visibleMainScreen = false;
        },
     
        toggleNotify(state) {
            state.notificationStatus = !state.notificationStatus;
        },

        openSideBar(state) {
            state.sidebarState = true;
        },

        closeSidebar(state) {
            state.sidebarState = false;
        },
        openFilter(state) {
            state.isFilterOpen = true;
        },

        closeFilter(state) {
            state.isFilterOpen = false;
        },

    }

})
export const { setScreenPage, clearScreenPage, showScreenPage, hideScreenPage, toggleNotify, openSideBar, closeSidebar, openFilter, closeFilter } = GeneralStateSlice.actions;

export default GeneralStateSlice.reducer;