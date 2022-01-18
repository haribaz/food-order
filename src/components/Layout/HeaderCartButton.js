import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../store/cart-context'

import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
    const ctx = useContext(CartContext)

    const [animation, setAnimation] = useState(false)

    const numberOfItems = ctx.items.reduce((acc, item) => {
        return acc + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${animation ? classes.bump : ''}`
    console.log(btnClasses)

    useEffect(() => {
        setAnimation(true)
        console.log('effect')
        const timer = setTimeout(() => {
            console.log('timeout')
            setAnimation(false)
        }, 300)
        return () => {
            console.log('closure')
            clearTimeout(timer)
        }
    }, [ctx.items])
    // useEffect(() => {
    //     console.log('effect')
    //     setAnimation(true)

    //     return () => {
    //         console.log('closure')
    //         setAnimation(false)
    //     }
    // }, [ctx.items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton
