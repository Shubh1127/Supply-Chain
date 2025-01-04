import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Streamline Your Supply Chain
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Optimize your operations, reduce costs, and increase efficiency with our advanced supply chain management platform.
            </p>
          </div>
          <div className="space-x-4">
            <Link to={'/role'}><button className="bg-blue-600 hover:bg-blue-700 rounded p-2 text-white" >Get Started</button></Link>
            <button className="border border-black bg-white rounded p-2" >Learn More</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

