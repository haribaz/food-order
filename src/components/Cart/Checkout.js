import classes from './Checkout.module.css'
import { useRef, useState } from 'react'

const isEmpty = (value) => value.trim() === ''
const isSixDigits = (value) => value.length === 6

const Checkout = (props) => {
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true
    })
    const nameRef = useRef()
    const streetRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault()

        const name = nameRef.current.value
        const street = streetRef.current.value
        const postal = postalRef.current.value
        const city = cityRef.current.value

        console.log(name, street, postal, city)

        const isNameValid = !isEmpty(name)
        const isStreetValid = !isEmpty(street)
        const isPostalValid = isSixDigits(postal)
        const isCityValid = !isEmpty(city)

        setFormInputValidity({
            name: isNameValid,
            street: isStreetValid,
            postal: isPostalValid,
            city: isCityValid
        })

        const isFormValid = isNameValid && isStreetValid && isPostalValid && isCityValid

        if (!isFormValid) {
            return
        }

        props.onConfirm({
            name,
            street,
            postal,
            city
        })
    }

    const inputClasses = (formInputField) => {
        return `${classes.control} ${formInputValidity[formInputField] ? '' : classes.invalid}`
    }

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={inputClasses('name')}>
                <label htmlFor="name">Your Name</label>
                <input ref={nameRef} type="text" id="name" />
            </div>
            {!formInputValidity.name && <span>Please enter your name</span>}
            <div className={inputClasses('street')}>
                <label htmlFor="street">Street</label>
                <input ref={streetRef} type="text" id="street" />
            </div>
            {!formInputValidity.street && <span>Please enter your street</span>}
            <div className={inputClasses('postal')}>
                <label htmlFor="postal">Postal Code</label>
                <input ref={postalRef} type="text" id="postal" />
            </div>
            {!formInputValidity.postal && <span>Please enter your postal code</span>}
            <div className={inputClasses('city')}>
                <label htmlFor="city">City</label>
                <input ref={cityRef} type="text" id="city" />
            </div>
            {!formInputValidity.city && <span>Please enter your city</span>}
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button type="submit" className={classes.submit}>
                    Confirm
                </button>
            </div>
        </form>
    )
}

export default Checkout
