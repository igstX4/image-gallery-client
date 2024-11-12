import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import $api from '../../core/axios';



export const fetchImages = createAsyncThunk(
    "api/getImages",
    async () => {
        const response = await $api.get("images");
        return response.data
    }
);




interface ImageI {
    userId: string,
    _id: string,
    imageUrl: string,
    title: string,
    uploadedAt: Date
}

interface InitialStateI {
    error: string
    data: ImageI[] | null,
}
// Define the initial state using that type
const initialState: InitialStateI = {
    error: "",
    data: null,
}

export const imagesSlice = createSlice({
    name: 'images',
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


        builder.addCase(fetchImages.fulfilled, (state, action) => {
            state.error = ''
            state.data = action.payload
        })



    }
})

export const { } = imagesSlice.actions

export default imagesSlice.reducer