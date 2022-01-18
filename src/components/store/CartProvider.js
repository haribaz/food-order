import CartContext from './cart-context'
import { useReducer } from 'react'

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const newAmount = state.totalAmount + action.item.price * action.item.amount

            const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id)
            const existingItem = state.items[existingItemIndex]

            let newItems

            if (existingItem) {
                const updatedItem = {
                    ...existingItem,
                    amount: existingItem.amount + action.item.amount
                }
                newItems = [...state.items]
                newItems[existingItemIndex] = updatedItem
            } else {
                newItems = [...state.items, action.item]
            }
            return {
                items: newItems,
                totalAmount: newAmount
            }
        case 'REMOVE_ITEM':
            const itemIndex = state.items.findIndex((item) => item.id === action.id)
            const item = state.items[itemIndex]
            const updatedAmount = state.totalAmount - item.price
            let updatedItems
            if (item.amount === 1) {
                updatedItems = state.items.filter((item) => item.id !== action.id)
            } else {
                const newItem = { ...item, amount: item.amount - 1 }
                updatedItems = [...state.items]
                updatedItems[itemIndex] = newItem
            }

            return {
                items: updatedItems,
                totalAmount: updatedAmount
            }

        default:
            return state
    }
}

const CartProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultCartState)

    const addItemHandler = (item) => {
        dispatch({ type: 'ADD_ITEM', item: item })
    }

    const removeItemHandler = (id) => {
        dispatch({ type: 'REMOVE_ITEM', id: id })
    }
    const Cart = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }

    return <CartContext.Provider value={Cart}>{props.children}</CartContext.Provider>
}

export default CartProvider
