import { useEffect, useState } from "react";
import { addToLS, getStoredCard, removeFromLS } from "../../utilities/localStorage";
import Bottle from "../Bottle/Bottle";
import Cart from "../Cart/Cart";
import './Bottles.css';
const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])
    // Load cart from local storage
    useEffect(() => {
        console.log(bottles.length)
        if (bottles.length) {
            const storedCart = getStoredCard();
            // console.log(storedCart, bottles)
            const savedCart = []
            for (const id of storedCart) {
                const bottle = bottles.find(bottle => bottle.id === id)
                if (bottle) {
                    savedCart.push(bottle)
                }
            }
            setCart(savedCart)
        }
    }, [bottles])
    const handleAddToCart = (bottle) => {
        console.log("Adding")
        const newCart = [...cart, bottle]
        setCart(newCart)
        addToLS(bottle.id)
    }
    const handleRemoveFromCart = (id) => {
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        // Remove from local storage
        removeFromLS(id)
    }
    return (
        <div>
            <h3>Bottles Here: {bottles.length}</h3>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
                }
            </div>

        </div>
    );
};

export default Bottles;