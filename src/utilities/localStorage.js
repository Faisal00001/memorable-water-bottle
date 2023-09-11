const getStoredCard=()=>{
   const storedCardString= localStorage.getItem('cart')
   if(storedCardString){
    return JSON.parse(storedCardString)
   }
   return []
}
const saveToLS=(cart)=>{
    const cartStringified=JSON.stringify(cart)
    localStorage.setItem('cart',cartStringified)
}
const addToLS=(id)=>{
    const cart=getStoredCard()
    cart.push(id)
    // Save to local storage
    saveToLS(cart)
}
const removeFromLS=(id)=>{
      const cart=getStoredCard();
    //   removing every id
      const remaining=cart.filter(idx=>idx!==id)
      saveToLS(remaining)
}
export { addToLS, getStoredCard, removeFromLS }

