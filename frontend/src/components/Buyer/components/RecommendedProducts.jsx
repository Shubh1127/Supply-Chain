const recommendedProducts = [
    { name: 'Inventory Management', image: 'https://m.media-amazon.com/images/I/41-t93SpAGL._SY445_SX342_PQ25_.jpg' },
    { name: 'Logistics Solutions', image: 'https://media.licdn.com/dms/image/v2/D4D12AQG8xwTte9Bp5w/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1712375344673?e=1741824000&v=beta&t=8yaXHHUJ48MV3GX0Lc7XIBemJetRWcusSY1gJkQIteA' },
    { name: 'Analytics Tools', image: 'https://www.deere.com/assets/images/region-4/products/combines/t680/r4x002420_rrd-1365x768.jpg' },
    { name: 'Supplier Network', image: 'https://image.made-in-china.com/2f0j00SuwbdqlEGeom/OEM-Shovel-Spade-High-Strength-Gardening-Tool-Factory-Price-Customized-Wholesale-Hand-Tools.webp' },
    { name: 'Supplier Network', image: 'https://image.made-in-china.com/2f0j00SuwbdqlEGeom/OEM-Shovel-Spade-High-Strength-Gardening-Tool-Factory-Price-Customized-Wholesale-Hand-Tools.webp' },
]

export default function RecommendedProducts() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recommendedProducts.map((product, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-60  mb-4 rounded"
              />
              <h3 className="text-sm font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <button  size="sm" className="mt-auto bg-yellow-400 rounded-md p-1">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

