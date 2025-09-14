"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  TrendingUp,
  Users,
  ShoppingBag,
  Eye,
  Heart,
  MessageSquare,
  Wand2,
  BarChart3,
  Settings,
  Plus,
} from "lucide-react"

export default function ArtisanDashboard() {
  const [aiPrompt, setAiPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)
    // Simulate AI content generation
    setTimeout(() => {
      setGeneratedContent(
        `Discover the timeless beauty of handcrafted ${aiPrompt.toLowerCase()}. Each piece tells a story of traditional craftsmanship passed down through generations, combining authentic techniques with contemporary appeal. Made with sustainable materials and meticulous attention to detail, these unique creations bring cultural heritage into your modern lifestyle.`,
      )
      setIsGenerating(false)
    }, 2000)
  }

  const stats = [
    { label: "Total Products", value: "24", change: "+3 this month", icon: ShoppingBag, color: "text-blue-600" },
    { label: "Profile Views", value: "1,247", change: "+12% this week", icon: Eye, color: "text-green-600" },
    { label: "Favorites", value: "89", change: "+5 new", icon: Heart, color: "text-red-600" },
    { label: "Messages", value: "12", change: "3 unread", icon: MessageSquare, color: "text-purple-600" },
  ]

  const recentProducts = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: "$85",
      views: 234,
      likes: 18,
      status: "Active",
      image: "/handwoven-silk-scarf.jpg",
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: "$120",
      views: 189,
      likes: 24,
      status: "Active",
      image: "/ceramic-tea-set.jpg",
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: "$65",
      views: 156,
      likes: 12,
      status: "Draft",
      image: "/wooden-jewelry-box.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Artisan Dashboard</h1>
              <p className="text-gray-600">Welcome back, Maya Patel</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-orange-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="ai-tools"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              AI Tools
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Profile Completion */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-orange-600" />
                    Profile Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Profile completeness</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Basic information completed
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Portfolio images uploaded
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                        Add craft story (recommended)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-gray-500">Handwoven Silk Scarf - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Product viewed 15 times</p>
                        <p className="text-xs text-gray-500">Ceramic Tea Set - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New follower</p>
                        <p className="text-xs text-gray-500">Sarah Johnson - 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Products */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Recent Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-4 border border-orange-100 rounded-lg"
                    >
                      <img
                        src={product.image || "/placeholder.svg?height=60&width=60"}
                        alt={product.name}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.price}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {product.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {product.likes}
                          </span>
                        </div>
                        <Badge
                          variant={product.status === "Active" ? "default" : "secondary"}
                          className={product.status === "Active" ? "bg-green-100 text-green-800" : ""}
                        >
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Content Generator */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Wand2 className="h-5 w-5 mr-2 text-orange-600" />
                    AI Content Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="ai-prompt">Describe your product or craft</Label>
                    <Textarea
                      id="ai-prompt"
                      placeholder="e.g., handwoven silk scarves with traditional patterns"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <Button
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Description
                      </>
                    )}
                  </Button>
                  {generatedContent && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <Label className="text-sm font-medium text-orange-800">Generated Content:</Label>
                      <p className="mt-2 text-sm text-gray-700">{generatedContent}</p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 border-orange-300 text-orange-700 bg-transparent"
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Price Optimizer */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                    Smart Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="product-category">Product Category</Label>
                    <Input id="product-category" placeholder="e.g., Textiles, Ceramics, Jewelry" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="material-cost">Material Cost ($)</Label>
                    <Input id="material-cost" type="number" placeholder="25.00" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="time-spent">Time Spent (hours)</Label>
                    <Input id="time-spent" type="number" placeholder="8" className="mt-1" />
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Get Pricing Suggestion
                  </Button>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">Recommended Price Range:</p>
                    <p className="text-lg font-bold text-green-900">$75 - $95</p>
                    <p className="text-xs text-green-700 mt-1">Based on similar products and market trends</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Insights */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-orange-600" />
                  AI Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Trending Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        sustainable
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        handmade
                      </Badge>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        traditional
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Best Upload Time</h3>
                    <p className="text-sm text-green-700">Tuesdays & Thursdays</p>
                    <p className="text-sm text-green-700">2:00 PM - 4:00 PM</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="font-medium text-purple-900 mb-2">Customer Preference</h3>
                    <p className="text-sm text-purple-700">Customers prefer products with cultural stories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Products</CardTitle>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentProducts.map((product) => (
                    <Card key={product.id} className="border-orange-100 hover:shadow-lg transition-shadow">
                      <div className="aspect-square overflow-hidden rounded-t-lg">
                        <img
                          src={product.image || "/placeholder.svg?height=200&width=200"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                        <p className="text-lg font-bold text-orange-600 mb-2">{product.price}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {product.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {product.likes}
                          </span>
                          <Badge
                            variant={product.status === "Active" ? "default" : "secondary"}
                            className={product.status === "Active" ? "bg-green-100 text-green-800" : ""}
                          >
                            {product.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-orange-300 text-orange-700 bg-transparent"
                          >
                            Edit
                          </Button>
                          <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Profile Views</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Product Views</span>
                      <span className="font-medium">3,456</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="font-medium">12.5%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProducts.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">#{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.views} views</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Revenue chart would be displayed here</p>
                    <p className="text-sm text-gray-400">Integration with analytics service required</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
