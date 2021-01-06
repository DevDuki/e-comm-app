import fs from 'fs'
import matter from 'gray-matter'
import marked from 'marked'

const Product = ({ product: { data, content } }) => {
  const html = marked(content) // converts the markdown syntax into an html syntax
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <p>{data.price/100}€</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export const getStaticPaths = () => {
  // product pages to generate
  const directory = `${process.cwd()}/content`
  const filenames = fs.readdirSync(directory)

  const paths = filenames.map((filename) => {
    return {
      params: {
        product: filename.replace('.md', '')
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