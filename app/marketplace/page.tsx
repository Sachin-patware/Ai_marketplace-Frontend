"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingCart,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("featured");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const products = [
    {
      id: 1,
      name: "Handwoven Silk Scarf",
      price: 85,
      originalPrice: 95,
      rating: 4.9,
      reviews: 24,
      artisan: "Maya Patel",
      location: "India",
      category: "Textiles",
      tags: ["Sustainable", "Silk"],
      image: "/Handwoven Silk Scarf.jpeg",
      inStock: true,
    },
    {
      id: 2,
      name: "Ceramic Tea Set",
      price: 120,
      rating: 4.8,
      reviews: 18,
      artisan: "Carlos Rivera",
      location: "Mexico",
      category: "Ceramics",
      tags: ["Handmade", "Ceramic"],
      image: "/ceramic tea.jpeg",
      inStock: true,
    },
    {
      id: 3,
      name: "Wooden Jewelry Box",
      price: 65,
      rating: 4.7,
      reviews: 31,
      artisan: "Amara Okafor",
      location: "Nigeria",
      category: "Woodwork",
      tags: ["Carved", "Storage"],
      image: "/Wooden Jewelry Box.jpeg",
      inStock: true,
    },
    {
      id: 4,
      name: "Alpaca Wool Blanket",
      price: 150,
      rating: 4.9,
      reviews: 42,
      artisan: "Isabella Quispe",
      location: "Peru",
      category: "Textiles",
      tags: ["Alpaca", "Warm"],
      image: "/Alpaca Wool Blanket.jpeg",
      inStock: true,
    },
    {
      id: 5,
      name: "Brass Singing Bowl",
      price: 45,
      rating: 4.6,
      reviews: 15,
      artisan: "Tenzin Norbu",
      location: "Nepal",
      category: "Metalwork",
      tags: ["Meditation", "Brass"],
      image: "/Brass Singing Bowl.jpeg",
      inStock: false,
    },
    {
      id: 6,
      name: "Leather Messenger Bag",
      price: 95,
      rating: 4.8,
      reviews: 28,
      artisan: "Ahmed Hassan",
      location: "Morocco",
      category: "Leather",
      tags: ["Leather", "Durable"],
      image: "/Leather Messenger Bag.jpeg",
      inStock: true,
    },
  ];

  const categories = [
    "Textiles",
    "Ceramics",
    "Woodwork",
    "Metalwork",
    "Leather",
  ];
  const locations = [
    "all",
    "India",
    "Mexico",
    "Nigeria",
    "Peru",
    "Nepal",
    "Morocco",
  ];

  // toggle like
  const toggleLike = (id: number) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // filtering
  let filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.artisan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(p.category);
    const matchesLocation =
      selectedLocation === "all" || p.location === selectedLocation;
    const matchesRating = p.rating >= minRating;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesCategory &&
      matchesLocation &&
      matchesRating
    );
  });

  // sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-orange-700">Marketplace</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
            <Button
              size="sm"
              variant={viewMode === "grid" ? "default" : "outline"}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Search + Sort */}
      <div className="max-w-7xl mx-auto p-4 flex gap-4 flex-wrap">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 shadow-sm"
          />
        </div>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-52 shadow-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <main className="max-w-7xl mx-auto p-4 flex gap-6">
        {/* Sidebar Filters */}
        {showFilters && (
          <aside className="w-64 space-y-4 hidden md:block">
            {/* Categories */}
            <Card className="shadow-sm hover:shadow-md transition">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Categories</h3>
                {categories.map((c) => (
                  <div key={c} className="flex items-center space-x-2 mb-1">
                    <Checkbox
                      checked={selectedCategories.includes(c)}
                      onCheckedChange={(val) =>
                        setSelectedCategories((prev) =>
                          val ? [...prev, c] : prev.filter((cat) => cat !== c)
                        )
                      }
                    />
                    <Label>{c}</Label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Price */}
            <Card className="shadow-sm hover:shadow-md transition">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Price</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                />
                <div className="flex justify-between text-sm mt-2 text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="shadow-sm hover:shadow-md transition">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Location</h3>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card className="shadow-sm hover:shadow-md transition">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Rating</h3>
                {[5, 4, 3].map((r) => (
                  <div key={r} className="flex items-center space-x-2 mb-1">
                    <Checkbox
                      checked={minRating === r}
                      onCheckedChange={(val) => setMinRating(val ? r : 0)}
                    />
                    <Label className="flex items-center gap-1">
                      {Array.from({ length: r }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400" />
                      ))}{" "}
                      & up
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        )}

        {/* Product Grid */}
        <section
          className={`flex-1 grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((p) => (
            <Card
              key={p.id}
              className="overflow-hidden shadow-sm hover:shadow-lg transition"
            >
              <div className="relative group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform"
                />
                {!p.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-3 right-3 rounded-full"
                  onClick={() => toggleLike(p.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      likedProducts.includes(p.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </Button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-gray-600">{p.artisan}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" /> {p.location}
                </div>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 fill-yellow-400" />
                  <span className="ml-1 text-sm">
                    {p.rating} ({p.reviews})
                  </span>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-orange-700">${p.price}</span>
                  <Button size="sm" disabled={!p.inStock}>
                    <ShoppingCart className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
