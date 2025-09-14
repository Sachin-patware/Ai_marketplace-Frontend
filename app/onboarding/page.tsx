"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Globe, Mic, Camera, MapPin, Palette } from "lucide-react"

export default function ArtisanOnboarding() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    craftType: "",
    bio: "",
    craftStory: "",
    languages: [],
    portfolio: [],
  })

  const craftTypes = [
    "Handloom & Textiles",
    "Pottery & Ceramics",
    "Jewelry & Accessories",
    "Wood Carving",
    "Metal Work",
    "Leather Craft",
    "Paper Art",
    "Stone Carving",
    "Glass Work",
    "Other",
  ]

  const languages = [
    "English",
    "Spanish",
    "French",
    "Hindi",
    "Mandarin",
    "Arabic",
    "Portuguese",
    "Bengali",
    "Russian",
    "Japanese",
  ]

  const router = useRouter()

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleComplete = () => {
    // Simulate successful registration
    alert("Profile created successfully! Welcome to ArtisanAI!")
    // Redirect to artisan dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to ArtisanAI</h1>
          <p className="text-gray-600">Let's set up your artisan profile in a few simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Your Craft & Location"}
              {currentStep === 3 && "Tell Your Story"}
              {currentStep === 4 && "Portfolio & Languages"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Let's start with your basic details"}
              {currentStep === 2 && "Tell us about your craft and where you're located"}
              {currentStep === 3 && "Share your journey and passion"}
              {currentStep === 4 && "Showcase your work and language preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Craft & Location */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="craftType">Type of Craft *</Label>
                  <Select
                    value={formData.craftType}
                    onValueChange={(value) => setFormData({ ...formData, craftType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your craft type" />
                    </SelectTrigger>
                    <SelectContent>
                      {craftTypes.map((craft) => (
                        <SelectItem key={craft} value={craft}>
                          <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4" />
                            {craft}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, State, Country"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Story */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself, your background, and what inspires you..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="craftStory">Your Craft Story *</Label>
                  <Textarea
                    id="craftStory"
                    value={formData.craftStory}
                    onChange={(e) => setFormData({ ...formData, craftStory: e.target.value })}
                    placeholder="How did you start your craft? What makes your work unique? Share your journey..."
                    rows={5}
                  />
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-800">AI Voice Story Tool</span>
                  </div>
                  <p className="text-sm text-orange-700 mb-3">
                    Record your story in your native language, and our AI will create a beautiful written narrative
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-200 text-orange-700 hover:bg-orange-100 bg-transparent"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Portfolio & Languages */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label>Portfolio Images</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload photos of your best work</p>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 10MB each</p>
                  </div>
                </div>
                <div>
                  <Label>Languages You Speak</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {languages.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <input type="checkbox" id={lang} className="rounded border-gray-300" />
                        <Label htmlFor={lang} className="text-sm">
                          {lang}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Multilingual Support</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your profile and products will be automatically translated to reach global customers
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Previous
              </Button>
              <Button
                onClick={currentStep === 4 ? handleComplete : handleNext}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {currentStep === 4 ? "Complete Profile" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
