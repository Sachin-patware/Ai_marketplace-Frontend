"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Share2, Trash2, Star, MapPin } from "lucide-react"
import Image from "next/image"

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: 89.99,
      originalPrice: 120.0,
      artisan: "Maya Patel",
      location: "Rajasthan, India",
      image: "/handwoven-silk-scarf.jpg",
      rating: 4.9,
      reviews: 127,
      inStock: true,
      category: "Textiles",
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: 156.0,
      artisan: "Carlos Rivera",
      location: "Puebla, Mexico",
      image: "/ceramic-tea-set.jpg",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      category: "Pottery",
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: 78.5,
      artisan: "Amara Okafor",
      location: "Lagos, Nigeria",
      image: "/wooden-jewelry-box.jpg",
      rating: 4.7,
      reviews: 156,
      inStock: false,
      category: "Wood Craft",
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (id: number) => {
    // Add to cart logic
    alert("Added to cart!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Your saved handcrafted treasures</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start exploring and save items you love</p>
            <Button className="bg-orange-500 hover:bg-orange-600">Explore Marketplace</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">{wishlistItems.length} items saved</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Wishlist
                </Button>
                <Button variant="outline" size="sm">
                  Add All to Cart
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative w-full md:w-48 h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <span>by {item.artisan}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{item.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                              <Badge variant="outline" className="text-xs">
                                {item.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWishlist(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                            {item.originalPrice && (
                              <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => addToCart(item.id)}
                              disabled={!item.inStock}
                              className={item.inStock ? "" : "opacity-50 cursor-not-allowed"}
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {item.inStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                            <Button className="bg-orange-500 hover:bg-orange-600" disabled={!item.inStock}>
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
