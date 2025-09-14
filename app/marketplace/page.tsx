"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Grid3X3, List, Star, Heart, ShoppingCart, MapPin, Sparkles, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  const products = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: 85,
      originalPrice: 95,
      rating: 4.9,
      reviews: 24,
      artisan: "Maya Patel",
      location: "Gujarat, India",
      category: "Textiles",
      tags: ["Sustainable", "Traditional", "Silk"],
      image: "/handwoven-silk-scarf-marketplace.jpg",
      isLiked: false,
      inStock: true,
      description: "Beautiful handwoven silk scarf with traditional Bandhani patterns",
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: 120,
      rating: 4.8,
      reviews: 18,
      artisan: "Carlos Rivera",
      location: "Oaxaca, Mexico",
      category: "Ceramics",
      tags: ["Handmade", "Talavera", "Ceramic"],
      image: "/ceramic-tea-set-marketplace.jpg",
      isLiked: true,
      inStock: true,
      description: "Traditional Talavera-style ceramic tea set, perfect for daily use",
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: 65,
      rating: 4.7,
      reviews: 31,
      artisan: "Amara Okafor",
      location: "Lagos, Nigeria",
      category: "Woodwork",
      tags: ["Carved", "Yoruba", "Storage"],
      image: "/wooden-jewelry-box-marketplace.jpg",
      isLiked: false,
      inStock: true,
      description: "Intricately carved wooden jewelry box with traditional Yoruba motifs",
    },
    {
      id: 4,
      name: "Alpaca Wool Blanket",
      price: 150,
      rating: 4.9,
      reviews: 42,
      artisan: "Isabella Quispe",
      location: "Cusco, Peru",
      category: "Textiles",
      tags: ["Alpaca", "Warm", "Traditional"],
      image: "/alpaca-wool-blanket.jpg",
      isLiked: false,
      inStock: true,
      description: "Soft and warm alpaca wool blanket with Andean patterns",
    },
    {
      id: 5,
      name: "Brass Singing Bowl",
      price: 45,
      rating: 4.6,
      reviews: 15,
      artisan: "Tenzin Norbu",
      location: "Kathmandu, Nepal",
      category: "Metalwork",
      tags: ["Meditation", "Brass", "Handcrafted"],
      image: "/brass-singing-bowl.jpg",
      isLiked: true,
      inStock: false,
      description: "Traditional brass singing bowl for meditation and sound therapy",
    },
    {
      id: 6,
      name: "Leather Messenger Bag",
      price: 95,
      rating: 4.8,
      reviews: 28,
      artisan: "Ahmed Hassan",
      location: "Fez, Morocco",
      category: "Leather",
      tags: ["Leather", "Functional", "Durable"],
      image: "/leather-messenger-bag.jpg",
      isLiked: false,
      inStock: true,
      description: "Handcrafted leather messenger bag with traditional Moroccan design",
    },
  ]

  const categories = ["All", "Textiles", "Ceramics", "Woodwork", "Metalwork", "Leather", "Jewelry"]
  const locations = ["All Locations", "India", "Mexico", "Nigeria", "Peru", "Nepal", "Morocco"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesPrice
  })

  const ProductCard = ({ product }: { product: (typeof products)[0] }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 border-orange-200 overflow-hidden">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
            <Heart className={`h-4 w-4 ${product.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        </div>
        {product.originalPrice && <Badge className="absolute top-3 left-3 bg-red-500 text-white">Sale</Badge>}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white text-gray-900">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">{product.artisan}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {product.location}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white" disabled={!product.inStock}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const ProductListItem = ({ product }: { product: (typeof products)[0] }) => (
    <Card className="hover:shadow-lg transition-shadow border-orange-200">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <div className="relative flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg?height=120&width=120"}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <Badge variant="secondary" className="bg-white text-gray-900 text-xs">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.artisan}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {product.location}
                </div>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white hover:bg-gray-50">
                    <Heart className={`h-4 w-4 ${product.isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-gray-600">Discover authentic handcrafted treasures from artisans worldwide</p>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-orange-600" />
              <span className="text-sm text-gray-600">AI-Curated Selection</span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, artisans, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-orange-200 focus:border-orange-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex border border-orange-200 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-orange-600 text-white" : "text-gray-600"}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-orange-600 text-white" : "text-gray-600"}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-64 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox id={category} />
                      <Label htmlFor={category} className="text-sm text-gray-700">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={5} className="w-full" />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Location</h3>
                <Select>
                  <SelectTrigger className="border-orange-200">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm text-gray-700">
                        <div className="flex items-center mr-2">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        & up
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <Select defaultValue="featured">
                <SelectTrigger className="w-48 border-orange-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <ProductListItem product={product} />
                  </Link>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
