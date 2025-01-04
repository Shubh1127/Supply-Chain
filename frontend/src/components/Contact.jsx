import { useState } from "react"
function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return <p className="text-green-200 font-semibold">Thank you for your message. We&apos;ll be in touch soon!</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <input 
        type="text" 
        placeholder="Your Name" 
        required 
        className="w-full px-3 py-2 bg-white text-gray-900 rounded-md"
      />
      <input 
        type="email" 
        placeholder="Your Email" 
        required 
        className="w-full px-3 py-2 bg-white text-gray-900 rounded-md"
      />
      <textarea 
        placeholder="Your Message" 
        required 
        className="w-full px-3 py-2 bg-white text-gray-900 rounded-md"
      />
      <button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full px-4 py-2 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

function Contact() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Optimize Your Supply Chain?
            </h2>
            <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
              Get in touch with us today and discover how SupplyChainPro can transform your business.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

