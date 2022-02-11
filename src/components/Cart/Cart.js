import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'
import CartItem from './CartItem'
import Checkout from './Checkout'
import React, { useContext, useState } from 'react'

const Cart = (props) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const ctx = useContext(CartContext)
    const hasItems = ctx.items.length > 0

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`

    const itemRemoveHandler = (id) => {
        ctx.removeItem(id)
    }

    const itemAddHandler = (item) => {
        ctx.addItem({
            ...item,
            amount: 1
        })
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {ctx.items.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        {...item}
                        onRemove={itemRemoveHandler.bind(null, item.id)}
                        onAdd={itemAddHandler.bind(null, item)}
                    />
                )
            })}
        </ul>
    )

    const openConfirmHandler = () => {
        setIsConfirmOpen(true)
    }

    const submitCartHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch(
            'https://react-http-da004-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    foodItems: ctx.items,
                    userData: userData
                })
            }
        )
        setIsSubmitting(false)
        setSubmitted(true)
        ctx.clearCart()
    }

    const modalBtnGroup = (
        <div className={classes.actions}>
            <button className={classes['button-alt']} onClick={props.onClose}>
                Cancel
            </button>
            {hasItems && (
                <button className={classes.button} onClick={openConfirmHandler}>
                    Order
                </button>
            )}
        </div>
    )

    const modalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isConfirmOpen && <Checkout onConfirm={submitCartHandler} onCancel={props.onClose} />}
            {!isConfirmOpen && modalBtnGroup}
        </React.Fragment>
    )

    return (
        <Modal onClick={props.onClose}>
            {isSubmitting && <p>Sending yout order...</p>}
            {submitted && <p>Your order has been submitted!</p>}
            {!isSubmitting && !submitted && modalContent}
        </Modal>
    )
}

export default Cart
