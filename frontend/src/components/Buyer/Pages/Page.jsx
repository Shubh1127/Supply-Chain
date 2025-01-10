import Header from '../components/BuyerHeader'
import Hero from '../components/BuyerHero'
import ProductCategories from '../Components/ProductCategories'
import RecommendedProducts from '../Components/RecommendedProducts'
import FeaturedProducts from '../components/FeaturedProducts'
import Footer from '../components/BuyerFooter'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ProductCategories />
        <FeaturedProducts />
        <RecommendedProducts />
      </main>
      <Footer />
    </div>
  )
}

