import styled from 'styled-components'
import { FiX } from "react-icons/fi";
import useCart from '../hooks/useCart'
import { useRouter } from 'next/router'

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  background-color: white;
  width: 350px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transform: translateX(${props => props.isOpen ? '0%' : '100%'});
  transition: transform 0.2s ease-in;
`

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const X = styled(FiX)`
  font-size: 2.5rem;
  margin: 1rem;
  margin-bottom: 0;

  &:hover {
    cursor: pointer;
  }
`

const Content = styled.div`
  padding: 0rem 2rem;
`

const Title = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  border-bottom: 1px solid #9f9f9f;
  margin-top: 1rem;
`

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9f9f9f;
  margin-bottom: 0.5rem;
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

const Cart = () => {
  const { cart, isOpen, openCart, closeCart, total } = useCart()
  const router = useRouter()

  const handleClick = () => {
    closeCart()
  }

  const navigateToCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <Container isOpen={isOpen} >
      <XContainer>
        <X onClick={handleClick} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
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
            <Button onClick={navigateToCheckout} >Checkout</Button>
          </>
        ) : (
          <p>Cart is empty</p>
        )}
        
      </Content>
    </Container>
  )
}

export default Cart