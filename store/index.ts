import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    id: number;
    quantity: number;
}

interface CartSliceState {
    cartItems: CartItem[];
    cartQuantity: number;
    cartIsVisible: boolean;
}

const initialState: CartSliceState = {
    cartItems: [],
    cartQuantity: 0,
    cartIsVisible: false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.cartIsVisible = !state.cartIsVisible;
        },
        increaseCartQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            state.cartQuantity++;
            if (item) {
                    item.quantity += 1;
                } else {
                    state.cartItems = [...state.cartItems, { id: action.payload, quantity: 1 }]
                }
        },
        decreaseCartQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find((item) => item.id === action.payload)
            state.cartQuantity--;
            if (item?.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            } else {
                item ? item.quantity-- : null
            } 
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find((item) => item.id === action.payload);
            if (item) {
                state.cartQuantity = state.cartQuantity - item.quantity;
            }
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
    }
});

export const { toggleCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = cartSlice.actions;

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
    },
});

type RootState = ReturnType<typeof store.getState>;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectCartQuantity = (state: RootState) => state.cart.cartQuantity;
export const selectCartIsVisible = (state: RootState) => state.cart.cartIsVisible;

export default store;