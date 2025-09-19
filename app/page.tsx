import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const featuredArtisans = [
    {
      id: 1,
      name: "Maya Patel",
      craft: "Handwoven Textiles",
      location: "Gujarat, India",
      rating: 4.9,
      image: "/indian-woman-weaving-colorful-textiles.jpg",
      speciality: "Traditional Bandhani",
      products: 24,
    },
    {
      id: 2,
      name: "Carlos Rivera",
      craft: "Ceramic Pottery",
      location: "Oaxaca, Mexico",
      rating: 4.8,
      image: "/mexican-potter-working-with-clay.jpg",
      speciality: "Talavera Style",
      products: 18,
    },
    {
      id: 3,
      name: "Amara Okafor",
      craft: "Wood Carving",
      location: "Lagos, Nigeria",
      rating: 4.9,
      image: "/african-woman-carving-wood-sculpture.jpg",
      speciality: "Yoruba Masks",
      products: 31,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-orange-100 text-orange-800 border-orange-200">AI-Powered Marketplace</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Empowering Local Artisans with <span className="text-orange-600">AI Technology</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              Discover authentic handcrafted treasures while supporting local artisans worldwide. Our AI tools help
              creators showcase their work and reach global audiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                  Explore Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-3 bg-transparent"
                >
                  Join as Artisan
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      

      {/* Featured Artisans Carousel */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Featured Artisans</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the stories and craftsmanship behind our most celebrated creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtisans.map((artisan) => (
              <Card
                key={artisan.id}
                className="group hover:shadow-xl transition-all duration-300 border-orange-200 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={artisan.image || "/placeholder.svg"}
                    alt={artisan.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{artisan.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{artisan.rating}</span>
                    </div>
                  </div>
                  <p className="text-orange-600 font-medium mb-1">{artisan.craft}</p>
                  <p className="text-gray-500 text-sm mb-3">{artisan.location}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      {artisan.speciality}
                    </Badge>
                    <span className="text-sm text-gray-500">{artisan.products} products</span>
                  </div>
                  
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

    
    </div>
  )
}
