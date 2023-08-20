import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0
}

const wishListSlice = createSlice({
    name: 'wishList',
    initialState: {
        wishListItems: []
    },
    reducers: {
        addToWishList: (state, action) => {
            const item=state.wishListItems.find((p)=>
            p.id===action.payload.id)
            if(!item){
                state.wishListItems.push({...action.payload})
            }
        },
        removeFromWishList: (state, action) => {
            state.wishListItems=state.wishListItems.filter((p)=>
            p.id!=action.payload.id)
        },
    },
})

export const { addToWishList, removeFromWishList } = wishListSlice.actions
export default wishListSlice.reducer