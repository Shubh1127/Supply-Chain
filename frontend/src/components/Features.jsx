import { BarChart2, Users, Shield } from 'lucide-react'

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BarChart2 className="h-10 w-10 text-blue-600" />}
            title="Real-time Analytics"
            description="Get instant insights into your supply chain performance with our advanced analytics dashboard."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-blue-600" />}
            title="Supplier Management"
            description="Efficiently manage your suppliers, track performance, and streamline communication."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-blue-600" />}
            title="Risk Management"
            description="Identify and mitigate potential risks in your supply chain with our AI-powered risk assessment tools."
          />
        </div>
      </div>
    </section>
  )
}

export default Features

