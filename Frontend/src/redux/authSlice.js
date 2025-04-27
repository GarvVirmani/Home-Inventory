import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        isAuthenticated:false
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setUser:(state,action)=>{
            state.user=action.payload;
            state.isAuthenticated=true;
        },
        logout:(state)=>{
            state.user=null;
            state.isAuthenticated=false;
        }
    }
})
export const {setLoading,setUser,logout}=authSlice.actions;
export default authSlice.reducer;