import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'
import styled from 'styled-components'
import UnstyledLink from '../components/styled/UnstyledLink'
import useCart from '../hooks/useCart'

const Container = styled.div`
  background: white;
  padding: 1rem 2rem;
  min-height: 200px;
  position: relative;
  transition: transform 0.3s;

  &:hover{
    transform: scale(1.02);
  }
`

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.5rem;
  margin: 0.5rem 0;

  @media screen and (max-width: 820px){
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    margin: 1rem 1rem;
  }
`

const Price = styled.p`
  position: absolute;
  bottom: 0;
  right: 1rem;
  font-size: 2rem;
`

const AddToCartButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: linear-gradient(to right, #43c6ac, #191654);
  color: white;
  border: none;
  padding: 1rem;
  transition: all 0.2s;

  &:active{
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, 
                rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }

  &:hover{
    transform: scale(1.1);
  }
`

const renderProduct = (product, addItem) => {
  const handleClick = (e) => {
    e.stopPropagation()
    addItem(product)
  }
  
  return (
    <Link key={product.id} href={product.slug}>
      <UnstyledLink>
        <Container>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <AddToCartButton onClick={handleClick}>Add to cart</AddToCartButton>
          <Price>{product.price/100}€</Price>
        </Container>
      </UnstyledLink>
    </Link>
  )
}

const HomePage = (props) => {
  const { cart, addItem } = useCart()
  return (
    <ProductsContainer>
      {props.products.map((product) => renderProduct(product, addItem))}
    </ProductsContainer>
  )
  
  
}

export const getStaticProps = async () => {
  const directory = `${process.cwd()}/content` // process.cwd() returns the directory depending on which environment we are in (for example form localhost if in dev or from netlify if in prod)
  const filenames = fs.readdirSync(directory)

  const products = filenames.map((filename) => {
    // read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString()
    // pull out the frontmatter => name
    const { data } = matter(fileContent) // matter() return an object which contains data (the variables on the top in the md file) and content (the rest of it) and some other stuff
    // return name, slug (the page for that product, e.g. my-app.com/products/basketball-hoop)
    const slug = `/products/${filename.replace('.md', '')}`
    const product = {
      ...data,
      slug
    }
    
    return product
  })

  return {
    props: {
      products
    }
  }
}

export default HomePage