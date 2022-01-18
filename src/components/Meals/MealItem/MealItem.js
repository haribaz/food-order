import React from 'react'

import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import classes from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = ({ id, name, description, price }) => {
    const newPrice = `$${price.toFixed(2)}`
    const ctx = useContext(CartContext)

    const amountHandler = (amount) => {
        const item = {
            id: id,
            name: name,
            amount: amount,
            price: price
        }

        ctx.addItem(item)
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{name}</h3>
                <div className={classes.description}>{description}</div>
                <div className={classes.price}>{newPrice}</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={amountHandler} />
            </div>
        </li>
    )
}

export default MealItem
