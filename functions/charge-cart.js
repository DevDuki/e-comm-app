const fs = require('fs')
const matter = require('gray-matter')

const getProducts = () => {
  const directory = `${process.cwd()}/content` // process.cwd() returns the directory depending on which environment we are in (for example form localhost if in dev or from netlify if in prod)
  const filenames = fs.readdirSync(directory)

  const products = filenames.map((filename) => {
    // read the file from fs
    const fileContent = fs.readFileSync(`${directory}/${filename}`).toString()
    // pull out the frontmatter => name
    const { data } = matter(fileContent) // matter() return an object which contains data (the variables on the top in the md file) and content (the rest of it) and some other stuff
    
    return data
  })

  return products
}

exports.handler = async (event, context) => {
  const { cart } = JSON.parse(event.body)

  const products = getProducts()

  const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find((product) => product.id === id)
    return {
      ...product,
      qty
    }
  })
  console.log('cwp', cartWithProducts)

  // talking to Stripe
  // charging the card
  return {
    statusCode: 200,
    body: "I have charged that card!"
  }
}