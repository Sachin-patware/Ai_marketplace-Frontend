"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  MapPin,
  Truck,
  Shield,
  RotateCcw,
  MessageCircle,
  Facebook,
  Twitter,
  Plus,
  Minus,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  // Mock product data - in real app, this would be fetched based on params.id
  const product = {
    id: 1,
    name: "Handwoven Silk Scarf",
    price: 85,
    originalPrice: 95,
    rating: 4.9,
    reviews: 24,
    inStock: true,
    stockCount: 12,
    description:
      "This exquisite handwoven silk scarf showcases the traditional Bandhani tie-dye technique passed down through generations in Gujarat, India. Each piece is meticulously crafted using pure mulberry silk and natural dyes, creating unique patterns that tell a story of cultural heritage and artistic mastery.",
    features: [
      "100% Pure Mulberry Silk",
      "Traditional Bandhani Technique",
      "Natural Dyes Only",
      "Hand-finished Edges",
      "Dimensions: 70cm x 180cm",
      "Care: Dry clean only",
    ],
    images: [
      "/handwoven-silk-scarf-detail-1.jpg",
      "/handwoven-silk-scarf-detail-2.jpg",
      "/handwoven-silk-scarf-detail-3.jpg",
      "/handwoven-silk-scarf-detail-4.jpg",
    ],
    artisan: {
      id: 1,
      name: "Maya Patel",
      avatar: "/maya-patel-avatar.jpg",
      location: "Gujarat, India",
      bio: "Maya has been practicing the ancient art of Bandhani for over 20 years, learning from her grandmother who was a master weaver. She specializes in traditional patterns while incorporating contemporary color palettes.",
      experience: "20+ years",
      totalProducts: 24,
      followers: 1247,
      rating: 4.9,
      responseTime: "Usually responds within 2 hours",
    },
    category: "Textiles",
    tags: ["Sustainable", "Traditional", "Silk", "Handwoven", "Natural Dyes"],
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "5-7 business days",
      returnPolicy: "30-day return policy",
    },
  }

  const reviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/sarah-avatar.jpg",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely stunning! The quality is exceptional and the colors are even more vibrant in person. Maya's craftsmanship is incredible.",
      helpful: 12,
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "/michael-avatar.jpg",
      rating: 5,
      date: "1 month ago",
      comment:
        "Bought this as a gift for my wife and she loves it. The traditional patterns are beautiful and the silk feels luxurious.",
      helpful: 8,
    },
    {
      id: 3,
      user: "Emma Wilson",
      avatar: "/emma-avatar.jpg",
      rating: 4,
      date: "1 month ago",
      comment: "Beautiful scarf with authentic craftsmanship. Shipping was fast and packaging was eco-friendly.",
      helpful: 5,
    },
  ]

  const relatedProducts = [
    {
      id: 2,
      name: "Silk Cushion Cover",
      price: 45,
      image: "/silk-cushion-cover.jpg",
      artisan: "Maya Patel",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Bandhani Table Runner",
      price: 65,
      image: "/bandhani-table-runner.jpg",
      artisan: "Maya Patel",
      rating: 4.7,
    },
    {
      id: 4,
      name: "Silk Wall Hanging",
      price: 120,
      image: "/silk-wall-hanging.jpg",
      artisan: "Maya Patel",
      rating: 4.9,
    },
  ]

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this beautiful ${product.name} by ${product.artisan.name}`

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        break
    }
    setShowShareMenu(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-orange-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/marketplace" className="hover:text-orange-600">
            Marketplace
          </Link>
          <span>/</span>
          <Link href={`/marketplace?category=${product.category.toLowerCase()}`} className="hover:text-orange-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
              <img
                src={product.images[selectedImageIndex] || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-10 w-10 p-0 bg-white/80 hover:bg-white"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </Button>
                <div className="relative">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-10 w-10 p-0 bg-white/80 hover:bg-white"
                    onClick={() => setShowShareMenu(!showShareMenu)}
                  >
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </Button>
                  {showShareMenu && (
                    <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-10">
                      <div className="flex flex-col space-y-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="justify-start"
                          onClick={() => handleShare("facebook")}
                        >
                          <Facebook className="h-4 w-4 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="justify-start"
                          onClick={() => handleShare("twitter")}
                        >
                          <Twitter className="h-4 w-4 mr-2" />
                          Twitter
                        </Button>
                        <Button size="sm" variant="ghost" className="justify-start" onClick={() => handleShare("copy")}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {product.originalPrice && <Badge className="absolute top-4 left-4 bg-red-500 text-white">Sale</Badge>}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg?height=80&width=80"}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{product.artisan.location}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <Badge className="bg-red-100 text-red-800">Save ${product.originalPrice - product.price}</Badge>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">In Stock ({product.stockCount} available)</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label className="font-medium">Quantity:</Label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="h-10 w-10 p-0"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="h-10 w-10 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  size="lg"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.shippingInfo.freeShipping ? "Free Shipping" : "Shipping Available"}
                      </p>
                      <p className="text-sm text-gray-600">
                        Estimated delivery: {product.shippingInfo.estimatedDelivery}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Easy Returns</p>
                      <p className="text-sm text-gray-600">{product.shippingInfo.returnPolicy}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Authenticity Guaranteed</p>
                      <p className="text-sm text-gray-600">Verified handcrafted products</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-orange-200">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Details
            </TabsTrigger>
            <TabsTrigger
              value="artisan"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Artisan
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Reviews ({product.reviews})
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Shipping
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="artisan" className="mt-6">
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={product.artisan.avatar || "/placeholder.svg"} alt={product.artisan.name} />
                    <AvatarFallback>
                      {product.artisan.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{product.artisan.name}</h3>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Artisan
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.artisan.location}
                      </span>
                      <span>{product.artisan.experience} experience</span>
                      <span>{product.artisan.totalProducts} products</span>
                      <span>{product.artisan.followers} followers</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{product.artisan.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-600">{product.artisan.responseTime}</span>
                    </div>
                    <p className="text-gray-700">{product.artisan.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                        <AvatarFallback>
                          {review.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.user}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="hover:text-gray-700">Helpful ({review.helpful})</button>
                          <button className="hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>Write a Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Rating</Label>
                    <div className="flex items-center space-x-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gray-300 hover:text-yellow-400 cursor-pointer" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="review">Your Review</Label>
                    <Textarea
                      id="review"
                      placeholder="Share your experience with this product..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">Submit Review</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Standard Shipping</span>
                        <span className="font-medium">{product.shippingInfo.freeShipping ? "Free" : "$9.99"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Delivery</span>
                        <span className="font-medium">{product.shippingInfo.estimatedDelivery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Express Shipping</span>
                        <span className="font-medium">$19.99 (2-3 business days)</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Return Policy</h3>
                    <p className="text-gray-700">{product.shippingInfo.returnPolicy}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Items must be returned in original condition with all tags attached.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More from {product.artisan.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                <Card className="group hover:shadow-lg transition-shadow border-orange-200">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image || "/placeholder.svg?height=300&width=300"}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600">{relatedProduct.artisan}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-gray-900">${relatedProduct.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{relatedProduct.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
