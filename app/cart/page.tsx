"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import Link from "next/link"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: 85,
      originalPrice: 95,
      quantity: 1,
      artisan: "Maya Patel",
      location: "Gujarat, India",
      image: "/handwoven-silk-scarf-cart.jpg",
      inStock: true,
      maxQuantity: 12,
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: 120,
      quantity: 1,
      artisan: "Carlos Rivera",
      location: "Oaxaca, Mexico",
      image: "/ceramic-tea-set-cart.jpg",
      inStock: true,
      maxQuantity: 5,
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: 65,
      quantity: 2,
      artisan: "Amara Okafor",
      location: "Lagos, Nigeria",
      image: "/wooden-jewelry-box-cart.jpg",
      inStock: true,
      maxQuantity: 8,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, Math.min(newQuantity, item.maxQuantity)) } : item,
      ),
    )
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo({ code: "WELCOME10", discount: 0.1 })
      setPromoCode("")
    } else if (promoCode.toLowerCase() === "artisan15") {
      setAppliedPromo({ code: "ARTISAN15", discount: 0.15 })
      setPromoCode("")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0),
    0,
  )
  const promoDiscount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - promoDiscount) * 0.08
  const total = subtotal - promoDiscount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Discover amazing handcrafted products from artisans worldwide</p>
            <Link href="/marketplace">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="border-orange-200">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg?height=120&width=120"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.artisan}</p>
                          <p className="text-sm text-gray-500">{item.location}</p>
                          {item.originalPrice && (
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className="bg-red-100 text-red-800">Sale</Badge>
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600">Quantity:</span>
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="text-xs text-gray-500">({item.maxQuantity} available)</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.originalPrice && (
                            <p className="text-sm text-green-600">
                              Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Link href="/marketplace">
                <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => setCartItems([])}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-orange-200 sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={applyPromoCode}
                      disabled={!promoCode.trim()}
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <Tag className="h-4 w-4" />
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-600 font-medium">Promo: {appliedPromo.code}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setAppliedPromo(null)}
                        className="text-red-600 hover:text-red-700 p-0 h-auto"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">Try: WELCOME10 or ARTISAN15</p>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Sale Savings</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                  )}
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount ({Math.round(appliedPromo.discount * 100)}%)</span>
                      <span>-${promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && <p className="text-xs text-green-600">Free shipping on orders over $100!</p>}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <span>Secure checkout powered by</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      SSL
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
