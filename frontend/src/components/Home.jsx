import Header from "./Header"
import Hero from "./Hero"
import Features from "./Features"
import Contact from "./Contact"
import Footer from "./Footer"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />     
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Home