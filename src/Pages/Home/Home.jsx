import Footer from "../Shared/Footer"
import About from "./About"
import Contact from "./Contact"
import How_works from "./How_works"

const Home = () => {
  return (
    <div>
      <section id="about">
        <About/>
      </section>
      <section id="workflow">
        <How_works/>
      </section>
      <section id="contact">
        <Contact/>
      </section>
      <Footer/>
    </div>
  )
}

export default Home
