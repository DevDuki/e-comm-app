import Page from '../components/styled/Page'
import useCart from '../hooks/useCart'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9f9f9f;
  margin-bottom: 1rem;
`

const ItemList = styled.ul`
  padding: 0;
`

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1.2rem;
`

const Button = styled.button`
  background: linear-gradient(to right, #43c6ac, #191654);
  font-size: 1.75rem;
  color: white;
  outline: none;
  border: none;
  width: 100%;
  padding: 0.75rem;

  &:hover{
    cursor: pointer;
  }
`

const Checkout = () => {
  const { cart, total } = useCart()

  const router = useRouter()

  const processPayment = async () => {
    const url = '/.netlify/functions/charge-cart'
    const newCart = cart.map(({ id, qty }) => ({
      id,
      qty
    }))

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
    const { data } = await axios.post(url, { cart: newCart })
    await stripe.redirectToCheckout({ sessionId: data.id })
  }

  return (
    <Page>
      <h2>Checkout</h2>
      {cart.length > 0 ? (
        <>
          <ItemList>
            {cart.map((item) => {
              return (
                <Item key={item.id}>
                  <span>{item.qty}x {item.name}</span>
                  <span>{item.price / 100}€</span>
                </Item>
              )
            })}
          </ItemList>
          <Total>
            <span>Total</span>
            <span>{total}€</span>
          </Total>
          <Button onClick={processPayment} >Process Payment</Button>
        </>
      ) : (
        <p>You do not appear to have any items in your cart!</p>
      )}
    </Page>
  )
}

export default Checkout