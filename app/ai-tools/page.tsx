"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Wand2,
  Globe,
  Mic,
  Share2,
  TrendingUp,
  Instagram,
  Facebook,
  Twitter,
  Copy,
  Download,
  Sparkles,
} from "lucide-react"

export default function AITools() {
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [isGenerating, setIsGenerating] = useState(false)

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

  const generateDescription = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent(
        `Discover the exquisite beauty of this handcrafted ${productName.toLowerCase()}. Each piece tells a story of traditional artistry passed down through generations. Made with premium materials and meticulous attention to detail, this unique creation brings authentic cultural heritage to your collection. The intricate patterns and vibrant colors reflect the rich artistic traditions of skilled artisans who pour their heart and soul into every creation.`,
      )
      setIsGenerating(false)
    }, 2000)
  }

  const socialMediaPosts = [
    {
      platform: "Instagram",
      icon: Instagram,
      content:
        "✨ New handcrafted treasure just dropped! Each piece tells a story of tradition and artistry. #HandmadeWithLove #ArtisanCraft #SupportLocal",
      hashtags: "#handmade #artisan #traditional #craft #unique #authentic",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      content:
        "Excited to share my latest creation! This beautiful piece represents hours of careful craftsmanship and generations of traditional techniques. Thank you for supporting local artisans! 🙏",
      hashtags: "",
    },
    {
      platform: "Twitter",
      icon: Twitter,
      content:
        "Just finished this amazing piece! The intricate details took weeks to perfect. So grateful for customers who appreciate authentic handmade art 🎨 #ArtisanLife",
      hashtags: "#handcrafted #artisan #smallbusiness",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Tools</h1>
          <p className="text-gray-600">Enhance your craft with intelligent marketing and storytelling tools</p>
        </div>

        <Tabs defaultValue="descriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="descriptions">Product Descriptions</TabsTrigger>
            <TabsTrigger value="translation">Translation</TabsTrigger>
            <TabsTrigger value="storytelling">Voice Storytelling</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Assistant</TabsTrigger>
          </TabsList>

          {/* Product Descriptions */}
          <TabsContent value="descriptions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-purple-600" />
                  AI Product Description Generator
                </CardTitle>
                <CardDescription>
                  Create compelling, SEO-optimized descriptions for your handcrafted products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="productName">Product Name</Label>
                      <Input
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g., Handwoven Silk Scarf"
                      />
                    </div>
                    <div>
                      <Label htmlFor="productDescription">Brief Description</Label>
                      <Textarea
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        placeholder="Tell us about your product - materials, techniques, inspiration..."
                        rows={4}
                      />
                    </div>
                    <Button
                      onClick={generateDescription}
                      disabled={!productName || isGenerating}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate Description
                        </>
                      )}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Label>Generated Description</Label>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                      {generatedContent ? (
                        <div className="space-y-3">
                          <p className="text-gray-800">{generatedContent}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">Generated description will appear here...</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Translation */}
          <TabsContent value="translation">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  AI Translation Service
                </CardTitle>
                <CardDescription>Translate your content to reach global customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label>Original Text</Label>
                      <Textarea placeholder="Enter text to translate..." rows={6} />
                    </div>
                    <div>
                      <Label>Target Language</Label>
                      <select className="w-full p-2 border rounded-md">
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>
                            {lang}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Globe className="w-4 h-4 mr-2" />
                      Translate
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Label>Translated Text</Label>
                    <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                      <p className="text-gray-500 italic">Translation will appear here...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Voice Storytelling */}
          <TabsContent value="storytelling">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-green-600" />
                  AI Voice Storytelling
                </CardTitle>
                <CardDescription>Record your story and let AI create beautiful written narratives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Mic className="w-16 h-16 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ready to Record</h3>
                    <p className="text-gray-600 mb-4">
                      Tell your craft story in your own words. Our AI will transform it into compelling written content.
                    </p>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      <Mic className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Tips for Great Storytelling:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Speak clearly and at a comfortable pace</li>
                    <li>• Share your inspiration and journey</li>
                    <li>• Mention unique techniques or materials</li>
                    <li>• Express your passion and cultural heritage</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Marketing Assistant */}
          <TabsContent value="marketing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-orange-600" />
                  Digital Marketing Assistant
                </CardTitle>
                <CardDescription>Generate social media posts, hashtags, and marketing content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {socialMediaPosts.map((post, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <post.icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{post.platform}</span>
                        <Badge variant="secondary">Auto-generated</Badge>
                      </div>
                      <p className="text-gray-800 mb-2">{post.content}</p>
                      {post.hashtags && <p className="text-blue-600 text-sm">{post.hashtags}</p>}
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-800">Trending Suggestions</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-orange-700">• Handmade jewelry is trending 📈 (+25% this week)</p>
                    <p className="text-sm text-orange-700">• "Sustainable crafts" hashtag is popular</p>
                    <p className="text-sm text-orange-700">• Best posting time: 7-9 PM local time</p>
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
