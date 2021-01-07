import styled from 'styled-components'
import { Normalize } from 'styled-normalize'
import Navbar from '../components/Navbar'

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap');
  min-height: 100vh;
  background: linear-gradient(to right, #43c6ac, #191654);
  font-family: 'Padauk', sans-serif;
  color: #444;
`

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`

const MyApp = ({ Component, pageProps }) => {
  return (
    <Container>
      <Normalize />
      <Navbar />
      <Page>  
        <Component {...pageProps} />
      </Page>
    </Container>
  )
}

export default MyApp