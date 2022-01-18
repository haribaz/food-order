import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'
import CartItem from './CartItem'
import { useContext } from 'react'

const Cart = (props) => {
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

    return (
        <Modal onClick={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button-alt']} onClick={props.onClose}>
                    Cancel
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
