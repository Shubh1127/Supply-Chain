export default function Hero() {
  return (
    <section className="relative">
      <img
        src="https://m.media-amazon.com/images/I/7130x7c9NmL._SX3000_.jpg"
        alt="Supply Chain Management"
        className="w-full  h-[300px] md:h-[400px] "
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Revolutionize Your Supply Chain</h1>
          <p className="text-xl mb-6">Streamline operations with Supply Chain Pro</p>
          
        </div>
      </div>
    </section>
  )
}

