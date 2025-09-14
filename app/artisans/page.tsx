"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Search, Heart, MessageCircle, Award, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ArtisansPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCraft, setSelectedCraft] = useState("")

  const artisans = [
    {
      id: 1,
      name: "Maya Patel",
      location: "Rajasthan, India",
      craftType: "Handloom & Textiles",
      bio: "Third-generation weaver specializing in traditional Rajasthani patterns",
      avatar: "/maya-patel-avatar.jpg",
      coverImage: "/maya-patel-workshop.jpg",
      rating: 4.9,
      reviews: 127,
      products: 23,
      yearsExperience: 15,
      languages: ["Hindi", "English", "Rajasthani"],
      specialties: ["Silk Weaving", "Block Printing", "Natural Dyes"],
      verified: true,
      featured: true,
    },
    {
      id: 2,
      name: "Carlos Rivera",
      location: "Puebla, Mexico",
      craftType: "Pottery & Ceramics",
      bio: "Master potter creating authentic Talavera ceramics with ancestral techniques",
      avatar: "/carlos-rivera-avatar.jpg",
      coverImage: "/carlos-rivera-workshop.jpg",
      rating: 4.8,
      reviews: 89,
      products: 31,
      yearsExperience: 22,
      languages: ["Spanish", "English"],
      specialties: ["Talavera Pottery", "Glazing", "Traditional Patterns"],
      verified: true,
      featured: false,
    },
    {
      id: 3,
      name: "Amara Okafor",
      location: "Lagos, Nigeria",
      craftType: "Wood Carving",
      bio: "Contemporary wood sculptor blending traditional Yoruba art with modern design",
      avatar: "/amara-okafor-avatar.jpg",
      coverImage: "/amara-okafor-workshop.jpg",
      rating: 4.7,
      reviews: 156,
      products: 18,
      yearsExperience: 12,
      languages: ["English", "Yoruba", "French"],
      specialties: ["Sculpture", "Furniture", "Decorative Art"],
      verified: true,
      featured: true,
    },
    {
      id: 4,
      name: "Kenji Tanaka",
      location: "Kyoto, Japan",
      craftType: "Ceramics & Pottery",
      bio: "Traditional Japanese potter specializing in tea ceremony ceramics",
      avatar: "/kenji-tanaka-avatar.jpg",
      coverImage: "/kenji-tanaka-workshop.jpg",
      rating: 4.9,
      reviews: 203,
      products: 27,
      yearsExperience: 28,
      languages: ["Japanese", "English"],
      specialties: ["Raku Pottery", "Tea Bowls", "Glazing"],
      verified: true,
      featured: false,
    },
  ]

  const locations = ["All Locations", "India", "Mexico", "Nigeria", "Japan", "Peru", "Morocco", "Thailand"]
  const craftTypes = [
    "All Crafts",
    "Handloom & Textiles",
    "Pottery & Ceramics",
    "Wood Carving",
    "Jewelry",
    "Metal Work",
    "Leather Craft",
  ]

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.craftType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artisan.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation =
      !selectedLocation || selectedLocation === "All Locations" || artisan.location.includes(selectedLocation)
    const matchesCraft = !selectedCraft || selectedCraft === "All Crafts" || artisan.craftType === selectedCraft

    return matchesSearch && matchesLocation && matchesCraft
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Talented Artisans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with skilled craftspeople from around the world. Each artisan brings generations of traditional
            knowledge and unique cultural perspectives to their craft.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search artisans, crafts, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCraft} onValueChange={setSelectedCraft}>
              <SelectTrigger>
                <SelectValue placeholder="Craft Type" />
              </SelectTrigger>
              <SelectContent>
                {craftTypes.map((craft) => (
                  <SelectItem key={craft} value={craft}>
                    {craft}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured Artisans */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Artisans</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artisans
              .filter((artisan) => artisan.featured)
              .map((artisan) => (
                <Card key={artisan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={artisan.coverImage || "/placeholder.svg?height=200&width=400&query=artisan+workshop"}
                      alt={`${artisan.name}'s workshop`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={artisan.avatar || "/placeholder.svg?height=64&width=64&query=artisan+avatar"}
                          alt={artisan.name}
                        />
                        <AvatarFallback>
                          {artisan.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-900">{artisan.name}</h3>
                          {artisan.verified && <Award className="w-5 h-5 text-blue-500" title="Verified Artisan" />}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{artisan.location}</span>
                        </div>
                        <Badge variant="outline" className="mb-3">
                          {artisan.craftType}
                        </Badge>
                        <p className="text-gray-700 text-sm mb-4">{artisan.bio}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{artisan.rating}</span>
                              <span>({artisan.reviews})</span>
                            </div>
                            <span>{artisan.products} products</span>
                            <span>{artisan.yearsExperience}+ years</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact
                            </Button>
                            <Link href={`/artisan/${artisan.id}`}>
                              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                                View Profile
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Artisans */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All Artisans</h2>
            <p className="text-gray-600">{filteredArtisans.length} artisans found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <Card key={artisan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-32">
                  <Image
                    src={artisan.coverImage || "/placeholder.svg?height=128&width=300&query=artisan+workshop"}
                    alt={`${artisan.name}'s workshop`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={artisan.avatar || "/placeholder.svg?height=48&width=48&query=artisan+avatar"}
                        alt={artisan.name}
                      />
                      <AvatarFallback>
                        {artisan.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <h3 className="font-semibold text-gray-900">{artisan.name}</h3>
                        {artisan.verified && <Award className="w-4 h-4 text-blue-500" />}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {artisan.location}
                      </div>
                    </div>
                  </div>

                  <Badge variant="outline" className="mb-2">
                    {artisan.craftType}
                  </Badge>
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">{artisan.bio}</p>

                  <div className="flex items-center gap-2 mb-3">
                    {artisan.languages.slice(0, 2).map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        <Globe className="w-3 h-3 mr-1" />
                        {lang}
                      </Badge>
                    ))}
                    {artisan.languages.length > 2 && (
                      <span className="text-xs text-gray-500">+{artisan.languages.length - 2} more</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{artisan.rating}</span>
                    </div>
                    <span>{artisan.products} products</span>
                    <span>{artisan.yearsExperience}+ years</span>
                  </div>

                  <Link href={`/artisan/${artisan.id}`}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">View Profile</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
