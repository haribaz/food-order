import React, { useEffect, useState } from 'react'

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await fetch(
                    'https://react-http-da004-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
                )

                if (!response.ok) {
                    throw new Error('Error fetching meals')
                }
                const data = await response.json()

                const modifiesMeals = []
                for (const key in data) {
                    modifiesMeals.push({
                        ...data[key],
                        id: key
                    })
                }

                setMeals(modifiesMeals)
                setIsLoading(false)
            } catch (e) {
                setIsLoading(false)
                setError(e.message)
            }
        }

        fetchMeals()
    })

    if (isLoading) {
        return <p className={classes.isLoading}>Loading...</p>
    }

    if (error) {
        return <p className={classes.isError}>{error}</p>
    }

    const mealsList = meals.map((meal) => {
        return <MealItem key={meal.id} {...meal} />
    })
    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
