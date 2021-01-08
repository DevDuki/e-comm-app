import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'
import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import Page from '../../components/styled/Page'

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`

const Subtitle = styled.p`
  padding: 0.75rem 0.5rem;
  color: #444;
`

const Price = styled.span`
  font-size: 2rem;
  background: #42c4ab;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  margin-bottom: 1rem;
  display: inline-block;
`

const Product = ({ product: { data, content } }) => {
  const { cart } = useCart()
  const html = marked(content) // converts the markdown syntax into an html syntax
  return (
    <Page>
      <Title>
        <h1>{data.name}</h1>
        <Subtitle>{data.description}</Subtitle>
      </Title>      
      <Price>{data.price/100}€</Price>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticPaths = () => {
  // product pages to generate
  const directory = `${process.cwd()}/content`
  const filenames = fs.readdirSync(directory)

  const paths = filenames.map((filename) => {
    return {
      params: {
        product: filename.replace('.md', '') // Name of this attribute here, has to match the name of the file in brackets [], in our case [product].js
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const productName = context.params.product //this gets the product name which is stored in the router's variale [product] of this file
  const filepath = `${process.cwd()}/content/${productName}.md` // Since we r trying to read the md file from the file syste (fs) we need to add the md here. NB: The hierarchy in the fs is the same as the router url
  const fileContent = fs.readFileSync(filepath).toString()
  const { data, content } = matter(fileContent)

  return {
    props: {
      product: {
        data,
        content
      }
    }
  }
}

export default Product