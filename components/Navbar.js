import Link from 'next/link'
import styled from 'styled-components'
import UnstyledLink from './styled/UnstyledLink'
import { FiShoppingCart } from "react-icons/fi";
import useCart from '../hooks/useCart'

const Nav = styled.nav`
  background: white;
  padding: 2rem;
`

const NavContainer = styled.div`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
`

const ShoppingCart = styled(FiShoppingCart)`
  &:hover {
    cursor: pointer;
  }
`

const CartCounter = styled.span`
  font-size: 1.5rem;
`

const Navbar = () => {
  const { cart, openCart } = useCart()

  const handleClick = () => {
    openCart()
  }

  return (
    <Nav>
      <NavContainer>
        <Link href="/">
          <UnstyledLink>Super Store</UnstyledLink>
        </Link>
        <div>
          <ShoppingCart onClick={handleClick} />
          <CartCounter>{cart.reduce((acc, cur) => { return acc + cur.qty }, 0)}</CartCounter>
        </div>
      </NavContainer>
    </Nav>
  )
}

export default Navbar