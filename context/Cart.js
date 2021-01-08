import { useState, useEffect, createContext } from 'react'

export const Context = createContext()

const Cart = ({ children }) => {
  const getInitialCart = () => JSON.parse(localStorage.getItem('cart'))
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [total, setTotal] = useState(0)

  /* little trick since localstorate is being called first time on the server-side, but
   * the server has no localstorage, we need to make sure that the useState calls the
   * getInitialCart function later on once the site has alrdy been rendered in the server
   * and is rdy to be used on the client (which has the attribute localStorage).
   * So the empty array in the end of this useEffect will cause the cart to be set once
   * the page is loaded on the client.
  */
  useEffect(() => {
    const initialCart = getInitialCart()
    if(initialCart){
      setCart(initialCart)
    }
  }, [])

  useEffect(() => {
    // write to local storage
    localStorage.setItem('cart', JSON.stringify(cart))

    // Calculate the total price
    const newTotal = cart.reduce((acc, cur) => {
      return acc + (cur.price * cur.qty / 100)
    }, 0)
    setTotal(newTotal)
  }, [cart])

  const openCart = () => {
    setIsOpen(true)
  }

  const closeCart = () => {
    setIsOpen(false)
  }

  const addItem = (product, qty = 1) => {
    const item = cart.find((item) => item.id === product.id)
    
    if(item) {
      item.qty += qty
      setCart([...cart])
    } else {
      setCart([...cart, { ...product, qty }])
    }    
  }

  const removeItem = (id) => {
    const newCart = cart.filter((item) => {
      item.id !== id
    })
    setCart(newCart)
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setCart([])
  }

  const exposed = {
    cart,
    addItem,
    removeItem,
    openCart,
    closeCart,
    isOpen,
    total,
    clearCart
  }

  return (
    <Context.Provider value={exposed}>
      {children}
    </Context.Provider>
  )
}

export default Cart