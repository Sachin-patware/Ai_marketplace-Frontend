"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Eye,
  MoreHorizontal,
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
} from "lucide-react"

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Orders",
      value: "1,234",
      change: "+8.2%",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Users",
      value: "8,549",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const recentOrders = [
    {
      id: "ART-001234",
      customer: "Sarah Johnson",
      artisan: "Maya Patel",
      product: "Handwoven Silk Scarf",
      amount: "$85.00",
      status: "completed",
      date: "2024-03-10",
    },
    {
      id: "ART-001235",
      customer: "Michael Chen",
      artisan: "Carlos Rivera",
      product: "Ceramic Tea Set",
      amount: "$120.00",
      status: "processing",
      date: "2024-03-10",
    },
    {
      id: "ART-001236",
      customer: "Emma Wilson",
      artisan: "Amara Okafor",
      product: "Wooden Jewelry Box",
      amount: "$65.00",
      status: "shipped",
      date: "2024-03-09",
    },
    {
      id: "ART-001237",
      customer: "David Brown",
      artisan: "Isabella Quispe",
      product: "Alpaca Wool Blanket",
      amount: "$150.00",
      status: "pending",
      date: "2024-03-09",
    },
  ]

  const artisans = [
    {
      id: 1,
      name: "Maya Patel",
      email: "maya@example.com",
      location: "Gujarat, India",
      products: 24,
      revenue: "$2,340",
      rating: 4.9,
      status: "active",
      joinDate: "2023-01-15",
      avatar: "/maya-patel-admin.jpg",
    },
    {
      id: 2,
      name: "Carlos Rivera",
      email: "carlos@example.com",
      location: "Oaxaca, Mexico",
      products: 18,
      revenue: "$1,890",
      rating: 4.8,
      status: "active",
      joinDate: "2023-02-20",
      avatar: "/carlos-rivera-admin.jpg",
    },
    {
      id: 3,
      name: "Amara Okafor",
      email: "amara@example.com",
      location: "Lagos, Nigeria",
      products: 31,
      revenue: "$3,120",
      rating: 4.9,
      status: "pending",
      joinDate: "2023-03-05",
      avatar: "/amara-okafor-admin.jpg",
    },
  ]

  const pendingProducts = [
    {
      id: 1,
      name: "Traditional Pottery Vase",
      artisan: "Carlos Rivera",
      category: "Ceramics",
      price: "$75",
      submittedDate: "2024-03-08",
      status: "pending",
      image: "/pottery-vase-pending.jpg",
    },
    {
      id: 2,
      name: "Beaded Necklace Set",
      artisan: "Amara Okafor",
      category: "Jewelry",
      price: "$45",
      submittedDate: "2024-03-07",
      status: "review",
      image: "/beaded-necklace-pending.jpg",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "processing":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your marketplace</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Reports
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
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-orange-200">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="artisans"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700"
            >
              Artisans
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
              {/* Recent Orders */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{order.amount}</p>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Artisans */}
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>Top Performing Artisans</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {artisans.slice(0, 3).map((artisan, index) => (
                      <div key={artisan.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">#{index + 1}</span>
                        </div>
                        <Avatar>
                          <AvatarImage src={artisan.avatar || "/placeholder.svg"} alt={artisan.name} />
                          <AvatarFallback>
                            {artisan.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{artisan.name}</p>
                          <p className="text-sm text-gray-600">{artisan.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{artisan.revenue}</p>
                          <p className="text-sm text-gray-500">{artisan.products} products</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Approvals */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="flex space-x-4 p-4 border border-orange-200 rounded-lg">
                      <img
                        src={product.image || "/placeholder.svg?height=60&width=60"}
                        alt={product.name}
                        className="w-15 h-15 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.artisan}</p>
                        <p className="text-sm text-gray-500">
                          {product.category} • {product.price}
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-transparent">
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Artisan</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                          <td className="py-3 px-4 text-gray-700">{order.customer}</td>
                          <td className="py-3 px-4 text-gray-700">{order.product}</td>
                          <td className="py-3 px-4 text-gray-700">{order.artisan}</td>
                          <td className="py-3 px-4 font-semibold text-gray-900">{order.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status}</span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-gray-700">{order.date}</td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Artisans Tab */}
          <TabsContent value="artisans" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Artisan Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search artisans..." className="pl-10 w-64" />
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white">Add Artisan</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artisans.map((artisan) => (
                    <Card key={artisan.id} className="border-orange-100">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={artisan.avatar || "/placeholder.svg"} alt={artisan.name} />
                            <AvatarFallback>
                              {artisan.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{artisan.name}</h3>
                            <p className="text-sm text-gray-600">{artisan.location}</p>
                            <Badge className={getStatusColor(artisan.status)}>{artisan.status}</Badge>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Products:</span>
                            <span className="font-medium">{artisan.products}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Revenue:</span>
                            <span className="font-medium">{artisan.revenue}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rating:</span>
                            <span className="font-medium">{artisan.rating}/5</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Joined:</span>
                            <span className="font-medium">{artisan.joinDate}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-orange-300 text-orange-700 bg-transparent"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-gray-300 text-gray-700 bg-transparent"
                          >
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Product Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="flex space-x-4 p-4 border border-orange-200 rounded-lg">
                      <img
                        src={product.image || "/placeholder.svg?height=80&width=80"}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">{product.artisan}</p>
                            <p className="text-sm text-gray-500">
                              {product.category} • {product.price}
                            </p>
                            <p className="text-xs text-gray-400">Submitted: {product.submittedDate}</p>
                          </div>
                          <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-300 text-red-700 bg-transparent">
                            <X className="h-3 w-3 mr-1" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-orange-300 text-orange-700 bg-transparent"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Review
                          </Button>
                        </div>
                      </div>
                    </div>
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
                  <CardTitle>Revenue Analytics</CardTitle>
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

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">User growth chart would be displayed here</p>
                      <p className="text-sm text-gray-400">Integration with analytics service required</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Platform Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">94.2%</p>
                    <p className="text-sm text-gray-600">Customer Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">2.4 days</p>
                    <p className="text-sm text-gray-600">Avg. Processing Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">12.5%</p>
                    <p className="text-sm text-gray-600">Return Rate</p>
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
