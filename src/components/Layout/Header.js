import React, { Fragment } from 'react'

import HeaderCartButton from './HeaderCartButton'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Swiggato</h1>
                <HeaderCartButton onClick={props.onOpen} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="Food"></img>
            </div>
        </Fragment>
    )
}

export default Header
