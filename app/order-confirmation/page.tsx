"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Mail, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = "ART-2024-001234"
  const estimatedDelivery = "March 15-18, 2024"

  const orderItems = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: 85,
      quantity: 1,
      artisan: "Maya Patel",
      image: "/handwoven-silk-scarf-confirmation.jpg",
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: 120,
      quantity: 1,
      artisan: "Carlos Rivera",
      image: "/ceramic-tea-set-confirmation.jpg",
    },
  ]

  const subtotal = 205
  const shipping = 0
  const tax = 16.4
  const total = 221.4

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Thank you for supporting local artisans</p>
          <Badge className="bg-green-100 text-green-800">Order #{orderNumber}</Badge>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Order Items */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-orange-600" />
                Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex space-x-4">
                  <img
                    src={item.image || "/placeholder.svg?height=60&width=60"}
                    alt={item.name}
                    className="w-15 h-15 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.artisan}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
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
            </CardContent>
          </Card>

          {/* Shipping & Next Steps */}
          <div className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2 text-orange-600" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Estimated Delivery</p>
                    <p className="text-gray-600">{estimatedDelivery}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shipping Address</p>
                    <p className="text-gray-600">
                      John Doe
                      <br />
                      123 Main Street
                      <br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Tracking</p>
                    <p className="text-sm text-gray-600">
                      You'll receive tracking information via email once your items ship.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-orange-600" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Order Confirmation Email</p>
                      <p className="text-gray-600">Sent to your email address</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Artisan Notification</p>
                      <p className="text-gray-600">Your order has been sent to the artisans</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Shipping Notification</p>
                      <p className="text-gray-600">You'll receive tracking info when items ship</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
            Track Your Order
          </Button>
          <Link href="/marketplace">
            <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent w-full sm:w-auto">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Support Message */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg border border-orange-200">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our customer support team is here to help with any questions about your order.
          </p>
          <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  )
}
