import Link from 'next/link'
import fs from 'fs'
import matter from 'gray-matter'

const HomePage = (props) => {
  return props.products.map((product) => {
    return (
      <div>
        <Link href={product.slug}>
          <a>
            <h1>{product.name}</h1>
          </a>
        </Link>
        <p>{product.description}</p>
        <p>{product.price/100}€</p>
      </div>
    )
  })
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