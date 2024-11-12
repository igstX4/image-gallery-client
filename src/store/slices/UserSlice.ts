import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import $api from '../../core/axios';


export const fetchAuth = createAsyncThunk(
    "api/Auth",
    async () => {
        // response.data.user.createdNotes
        const response = await $api.post("users/getMe", {});
        console.log(response)
        return response.data
    }
);

export const fetchMe = createAsyncThunk(
    "api/getMe",
    async () => {
        // response.data.user.createdNotes
        const response = await $api.get("users/getMe");
        console.log(response)
        return response.data
    }
);
interface UserState {
    email: string,
    password: string,
    telegramId: string,
    authToken: string
}

interface InitialStateI {
    error: string
    data: UserState | null,
}
// Define the initial state using that type
const initialState: InitialStateI = {
    error: "",
    data: null,
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // setUser : (state, action: PayloadAction<UserState>) => {
            
        // }
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchRegister.fulfilled, (state, action ) => {
        //     state.error = ''
        //     console.log(action.payload)
        //     if (action.payload.username) {
        //         state.error = ''
        //         state.data = action.payload
        //     } else {
        //         state.data = null
        //         state.error = action.payload
        //     }
        // })


        builder.addCase(fetchMe.fulfilled, (state, action) => {
            state.error = ''
            state.data = action.payload
        })



    }
})

export const { } = userSlice.actions

export default userSlice.reducer