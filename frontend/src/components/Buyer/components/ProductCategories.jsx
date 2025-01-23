// import Image from 'next/image'
// import {Link} from 'react-router-dom'
import { useBuyer } from '../../../Context/BuyerContext'
const categories = [
  { name: 'Fruits', image: 'https://imgs.search.brave.com/IiAxxKFYqN5FzdqXeUt1OjBSb5Ue3uXfJPZ7oqiUFrc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY1LzcwLzY1/LzM2MF9GXzY1NzA2/NTk3X3VObTJTd2xQ/SXVOVUR1TXdvNnN0/QmQ4MWUyNVk4Szhz/LmpwZw' },
  { name: 'Vegetables', image: 'https://imgs.search.brave.com/D_VzhYsa-wiscSZsSahJV1w_09I8G0-_px7aP6C8G1g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzQ3LzUxLzYw/LzM2MF9GXzE0NzUx/NjA2M19oQ1hJOFZV/SWRCWXVkMEIwaGhT/M1lvNUNGVFQxYTRn/OC5qcGc' },
  { name: 'Grains', image: 'https://imgs.search.brave.com/CZPt5HCxWCCuH1uWDI0xU-WKIpzCe9p5NLpRJpsmZlU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzQ0LzE2Lzc5/LzM2MF9GXzI0NDE2/Nzk3M19FN2FSZ1k5/TkhYOXFXMFFXT2Fa/TndtRzhOQkphYTFy/Zi5qcGc' },
  { name: 'Dairy', image: 'https://imgs.search.brave.com/CHRRGi7LoxLkCyEkp1-XbGz4xMIKSKfQaZiLzx5oFpQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDk1/OTUwODYwL3Bob3Rv/L2RhaXJ5LXByb2R1/Y3RzLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1VZGU2bW9T/NlFHR2ZQdDdnM05s/bVRXNUpNR3EwTmxw/c3NBZjdpT3ZDRmhJ/PQ' },
] 
  

export default function ProductCategories() {
  const {Getcategory} = useBuyer()
  const handleClick = (category) => {
    Getcategory(category)
  }
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <button key={index} onClick={()=>handleClick(category.name)}  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-60  mb-4 rounded"
              />
              <h3 className="text-lg font-semibold text-center">{category.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

