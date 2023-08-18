import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((p) =>
                p.id === action.payload.id);

            if (item) {
                item.quantity++;
                item.attributes.price = item.quantity * item.singleItemPrice;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
            }
        },
        updateCart: (state, action) => {
            state.cartItems = state.cartItems.map((p) => {
                if (p.id === action.payload.id) {
                    if (action.payload.key === "quantity") {
                        p.attributes.price =
                            p.singleItemPrice * action.payload.val;
                    }
                    return { ...p, [action.payload.key]: action.payload.val };
                }
                return p;
            });
        },
        removeCartItem:(state,action)=>{
            state.cartItems=state.cartItems.filter((p)=>
            p.id!=action.payload.id)
        }
    }
});

// Action creators are generated for each case reducer function
export const { addToCart,updateCart,removeCartItem } = cartSlice.actions

export default cartSlice.reducer