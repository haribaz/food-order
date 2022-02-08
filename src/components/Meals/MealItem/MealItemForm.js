import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef, useState } from 'react'

const MealItemForm = (props) => {
    const inputAmountRef = useRef()
    const [isAmountValid, setIsAmountValid] = useState(true)

    const submitHandler = (event) => {
        event.preventDefault()
        const amountString = inputAmountRef.current.value
        const amountNumber = +amountString

        if (amountString.trim().length === 0 || amountNumber <= 0 || amountNumber > 5) {
            setIsAmountValid(false)
            return
        }

        props.onAddToCart(amountNumber)
        setIsAmountValid(true)
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={inputAmountRef}
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ Add</button>
            {!isAmountValid && <p>Amount must be between 1 and 5</p>}
        </form>
    )
}

export default MealItemForm
