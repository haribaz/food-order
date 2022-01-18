import { useState } from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './components/store/CartProvider'

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = () => {
        setIsCartOpen(true)
    }

    const closeCart = () => {
        setIsCartOpen(false)
    }

    return (
        <CartProvider>
            {isCartOpen && <Cart onClose={closeCart} />}
            <Header onOpen={openCart} />
            <main>
                <Meals />
            </main>
        </CartProvider>
    )
}

export default App
