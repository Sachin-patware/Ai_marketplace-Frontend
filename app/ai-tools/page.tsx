"use client"

import { useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Wand2,
  Globe,
  Mic,
  Share2,
  Copy,
  Sparkles,
  Loader2,
  AlertCircle,
  Volume2,
  Download,
  Play,
  Pause,
  Square,
} from "lucide-react"

const BASE_URL = "https://gemini-express-backend.onrender.com"

export default function AITools() {
  const [descriptionForm, setDescriptionForm] = useState({
    product: "",
    culture: "",
    tone: "warm and evocative",
  })
  const [translationForm, setTranslationForm] = useState({
    text: "",
    targetLang: "Spanish",
  })
  const [storytellingForm, setStorytellingForm] = useState({
    product: "",
    culture: "",
    tone: "warm and evocative",
    languageCode: "en",
  })
  const [marketingForm, setMarketingForm] = useState({
    product: "",
    platform: "Instagram",
    tone: "catchy and concise",
  })

  const [results, setResults] = useState({
    description: "",
    translation: "",
    storytelling: "",
    marketing: "",
  })

  const [audioUrl, setAudioUrl] = useState("")
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const [loading, setLoading] = useState({
    description: false,
    translation: false,
    storytelling: false,
    storytellingAudio: false,
    marketing: false,
  })

  const [errors, setErrors] = useState({
    description: "",
    translation: "",
    storytelling: "",
    marketing: "",
  })

  const languages = [
    "Spanish",
    "French",
    "Hindi",
    "Mandarin",
    "Arabic",
    "Portuguese",
    "Bengali",
    "Russian",
    "Japanese",
    "German",
    "Italian",
    "Korean",
  ]

  const platforms = ["Instagram", "Facebook", "Twitter", "LinkedIn", "TikTok"]
  const tones = ["warm and evocative", "professional", "casual", "catchy and concise", "elegant", "playful"]

  const handleApiError = (error: any, toolName: string) => {
    console.log(`[v0] API Error for ${toolName}:`, error)

    let errorMessage = "An unexpected error occurred. Please try again."

    if (error.code === "ECONNREFUSED" || error.message === "Network Error") {
      errorMessage = "Cannot connect to the server. Please ensure the backend is running on http://localhost:5000"
    } else if (error.response) {
      const status = error.response.status
      const data = error.response.data

      switch (status) {
        case 400:
          errorMessage = data?.error || "Invalid request. Please check your input."
          break
        case 500:
          errorMessage = "Server error occurred. Please try again later."
          break
        case 503:
          errorMessage = "Service temporarily unavailable. Please try again in a moment."
          break
        default:
          errorMessage = `Server returned error ${status}. Please try again.`
      }
    }

    return errorMessage
  }

  const generateDescription = async () => {
    if (!descriptionForm.product || !descriptionForm.culture) return

    setLoading((prev) => ({ ...prev, description: true }))
    setErrors((prev) => ({ ...prev, description: "" }))

    try {
      console.log("[v0] Generating description with:", descriptionForm)
      const response = await axios.post(`${BASE_URL}/api/description`, descriptionForm)
      console.log("[v0] Description response:", response.data)

      setResults((prev) => ({
        ...prev,
        description: response.data.description || response.data.text || "Generated description",
      }))
    } catch (error) {
      console.log("[v0] Description error:", error)
      const errorMessage = handleApiError(error, "description")
      setErrors((prev) => ({ ...prev, description: errorMessage }))
    } finally {
      setLoading((prev) => ({ ...prev, description: false }))
    }
  }

  const translateText = async () => {
    if (!translationForm.text || !translationForm.targetLang) return

    setLoading((prev) => ({ ...prev, translation: true }))
    setErrors((prev) => ({ ...prev, translation: "" }))

    try {
      console.log("[v0] Translating text with:", translationForm)
      const response = await axios.post(`${BASE_URL}/api/translation`, translationForm)
      console.log("[v0] Translation response:", response.data)

      setResults((prev) => ({
        ...prev,
        translation:
          response.data.translation || response.data.translatedText || response.data.text || "Translation completed",
      }))
    } catch (error) {
      console.log("[v0] Translation error:", error)
      const errorMessage = handleApiError(error, "translation")
      setErrors((prev) => ({ ...prev, translation: errorMessage }))
    } finally {
      setLoading((prev) => ({ ...prev, translation: false }))
    }
  }

  const generateStory = async () => {
    if (!storytellingForm.product || !storytellingForm.culture) return

    setLoading((prev) => ({ ...prev, storytelling: true }))
    setErrors((prev) => ({ ...prev, storytelling: "" }))

    try {
      console.log("[v0] Generating story with:", storytellingForm)
      const response = await axios.post(`${BASE_URL}/api/storytelling`, {
        product: storytellingForm.product,
        culture: storytellingForm.culture,
        tone: storytellingForm.tone,
      })
      console.log("[v0] Story response:", response.data)

      setResults((prev) => ({ ...prev, storytelling: response.data.story || response.data.text || "Generated story" }))
    } catch (error) {
      console.log("[v0] Story error:", error)
      const errorMessage = handleApiError(error, "storytelling")
      setErrors((prev) => ({ ...prev, storytelling: errorMessage }))
    } finally {
      setLoading((prev) => ({ ...prev, storytelling: false }))
    }
  }

  const generateAudio = async () => {
    if (!storytellingForm.product || !storytellingForm.culture) return

    setLoading((prev) => ({ ...prev, storytellingAudio: true }))
    setErrors((prev) => ({ ...prev, storytelling: "" }))

    try {
      console.log("[v0] Generating audio with:", storytellingForm)
      const response = await axios.post(
        `${BASE_URL}/api/storytelling/tts`,
        {
          product: storytellingForm.product,
          culture: storytellingForm.culture,
          tone: storytellingForm.tone,
          voiceOptions: { languageCode: storytellingForm.languageCode },
        },
        {
          responseType: "blob",
        },
      )

      console.log("[v0] Audio response received")
      const audioBlob = new Blob([response.data], { type: "audio/mpeg" })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    } catch (error) {
      console.log("[v0] Audio error:", error)
      const errorMessage = handleApiError(error, "storytelling audio")
      setErrors((prev) => ({ ...prev, storytelling: errorMessage }))
    } finally {
      setLoading((prev) => ({ ...prev, storytellingAudio: false }))
    }
  }

  const generateMarketing = async () => {
    if (!marketingForm.product) return

    setLoading((prev) => ({ ...prev, marketing: true }))
    setErrors((prev) => ({ ...prev, marketing: "" }))

    try {
      console.log("[v0] Generating marketing with:", marketingForm)
      const response = await axios.post(`${BASE_URL}/api/marketing`, marketingForm)
      console.log("[v0] Marketing response:", response.data)

      setResults((prev) => ({
        ...prev,
        marketing:
          response.data.post ||
          response.data.marketingCopy ||
          response.data.marketing ||
          response.data.text ||
          "Marketing content generated",
      }))
    } catch (error) {
      console.log("[v0] Marketing error:", error)
      const errorMessage = handleApiError(error, "marketing")
      setErrors((prev) => ({ ...prev, marketing: errorMessage }))
    } finally {
      setLoading((prev) => ({ ...prev, marketing: false }))
    }
  }

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      setAudioPlayer(audio)
      audio.play()
      setIsPlaying(true)
      audio.onended = () => setIsPlaying(false)
    }
  }

  const pauseAudio = () => {
    if (audioPlayer) {
      audioPlayer.pause()
      setIsPlaying(false)
    }
  }

  const stopAudio = () => {
    if (audioPlayer) {
      audioPlayer.pause()
      audioPlayer.currentTime = 0
      setIsPlaying(false)
    }
  }

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement("a")
      link.href = audioUrl
      link.download = "story-audio.mp3"
      link.click()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("✅ Copied to clipboard!")
  }

  const ScrollableOutput = ({
    content,
    placeholder,
    loading: isLoading,
    onCopy,
  }: {
    content: string
    placeholder: string
    loading: boolean
    onCopy: () => void
  }) => (
    <div className="bg-white border-2 border-gray-100 rounded-xl shadow-sm">
      <div className="p-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400 mr-2" />
            <span className="text-gray-500">Generating...</span>
          </div>
        ) : content ? (
          <div className="space-y-3">
            <p className="text-gray-800 leading-relaxed">{content}</p>
            <div className="pt-2 border-t border-gray-100">
              <Button
                size="sm"
                variant="outline"
                onClick={onCopy}
                className="hover:bg-gray-50 transition-colors bg-transparent"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic py-8 text-center">{placeholder}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Tools</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance your craft with intelligent marketing and storytelling tools designed for artisans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Descriptions Tool */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Wand2 className="w-6 h-6 text-orange-600" />
                </div>
                Product Description Generator
              </CardTitle>
              <CardDescription className="text-gray-600">
                Create compelling, culturally-aware descriptions for your handcrafted products
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.description && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">{errors.description}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="product" className="text-sm font-medium text-gray-700">
                    Product Name
                  </Label>
                  <Input
                    id="product"
                    value={descriptionForm.product}
                    onChange={(e) => setDescriptionForm((prev) => ({ ...prev, product: e.target.value }))}
                    placeholder="e.g., Handwoven Silk Scarf"
                    className="mt-1 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <Label htmlFor="culture" className="text-sm font-medium text-gray-700">
                    Cultural Background
                  </Label>
                  <Input
                    id="culture"
                    value={descriptionForm.culture}
                    onChange={(e) => setDescriptionForm((prev) => ({ ...prev, culture: e.target.value }))}
                    placeholder="e.g., Indian, Mexican, Moroccan"
                    className="mt-1 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
                <div>
                  <Label htmlFor="tone" className="text-sm font-medium text-gray-700">
                    Tone
                  </Label>
                  <Select
                    value={descriptionForm.tone}
                    onValueChange={(value) => setDescriptionForm((prev) => ({ ...prev, tone: value }))}
                  >
                    <SelectTrigger className="mt-1 border-gray-200 focus:border-orange-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone} value={tone}>
                          {tone}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={generateDescription}
                  disabled={!descriptionForm.product || !descriptionForm.culture || loading.description}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading.description ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate Description
                    </>
                  )}
                </Button>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Generated Description</Label>
                <ScrollableOutput
                  content={results.description}
                  placeholder="Generated description will appear here..."
                  loading={loading.description}
                  onCopy={() => copyToClipboard(results.description)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Translation Tool */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                Translation Service
              </CardTitle>
              <CardDescription className="text-gray-600">
                Translate your content to reach global customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.translation && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">{errors.translation}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Original Text</Label>
                  <Textarea
                    value={translationForm.text}
                    onChange={(e) => setTranslationForm((prev) => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter text to translate..."
                    rows={4}
                    className="mt-1 border-gray-200 focus:border-blue-400 focus:ring-blue-400 resize-none"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Target Language</Label>
                  <Select
                    value={translationForm.targetLang}
                    onValueChange={(value) => setTranslationForm((prev) => ({ ...prev, targetLang: value }))}
                  >
                    <SelectTrigger className="mt-1 border-gray-200 focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={translateText}
                  disabled={!translationForm.text || loading.translation}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading.translation ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <Globe className="w-5 h-5 mr-2" />
                      Translate
                    </>
                  )}
                </Button>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Translated Text</Label>
                <ScrollableOutput
                  content={results.translation}
                  placeholder="Translation will appear here..."
                  loading={loading.translation}
                  onCopy={() => copyToClipboard(results.translation)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Storytelling Tool */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mic className="w-6 h-6 text-green-600" />
                </div>
                Storytelling Generator
              </CardTitle>
              <CardDescription className="text-gray-600">
                Generate compelling stories about your craft and cultural heritage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.storytelling && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">{errors.storytelling}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="storyProduct" className="text-sm font-medium text-gray-700">
                    Product Name
                  </Label>
                  <Input
                    id="storyProduct"
                    value={storytellingForm.product}
                    onChange={(e) => setStorytellingForm((prev) => ({ ...prev, product: e.target.value }))}
                    placeholder="e.g., Traditional Pottery Vase"
                    className="mt-1 border-gray-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div>
                  <Label htmlFor="storyCulture" className="text-sm font-medium text-gray-700">
                    Cultural Background
                  </Label>
                  <Input
                    id="storyCulture"
                    value={storytellingForm.culture}
                    onChange={(e) => setStorytellingForm((prev) => ({ ...prev, culture: e.target.value }))}
                    placeholder="e.g., Zapotec, Berber, Balinese"
                    className="mt-1 border-gray-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="storyTone" className="text-sm font-medium text-gray-700">
                      Story Tone
                    </Label>
                    <Select
                      value={storytellingForm.tone}
                      onValueChange={(value) => setStorytellingForm((prev) => ({ ...prev, tone: value }))}
                    >
                      <SelectTrigger className="mt-1 border-gray-200 focus:border-green-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="languageCode" className="text-sm font-medium text-gray-700">
                      Language Code
                    </Label>
                    <Input
                      id="languageCode"
                      value={storytellingForm.languageCode}
                      onChange={(e) => setStorytellingForm((prev) => ({ ...prev, languageCode: e.target.value }))}
                      placeholder="e.g., en, es, fr"
                      className="mt-1 border-gray-200 focus:border-green-400 focus:ring-green-400"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={generateStory}
                    disabled={!storytellingForm.product || !storytellingForm.culture || loading.storytelling}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading.storytelling ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Story
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={generateAudio}
                    disabled={!storytellingForm.product || !storytellingForm.culture || loading.storytellingAudio}
                    variant="outline"
                    className="border-2 border-green-200 hover:bg-green-50 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
                  >
                    {loading.storytellingAudio ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Generate Audio
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Generated Story</Label>
                <ScrollableOutput
                  content={results.storytelling}
                  placeholder="Generated story will appear here..."
                  loading={loading.storytelling}
                  onCopy={() => copyToClipboard(results.storytelling)}
                />
              </div>

              {audioUrl && (
  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-2xl border border-green-200 shadow-sm mt-4">
    {/* Label */}
    <Label className="text-base font-semibold text-gray-800 mb-3 block">
      🎧 Generated Audio
    </Label>

    {/* Controls */}
    <div className="flex items-center gap-3 mb-3">
      {/* Stop button */}
      <Button
        size="sm"
        onClick={stopAudio}
        variant="outline"
        className="flex items-center gap-1 border-green-300 hover:bg-green-100 text-green-700 rounded-lg px-3"
      >
        <Square className="w-4 h-4" />
        Stop
      </Button>

      {/* Download button */}
      <Button
        size="sm"
        onClick={downloadAudio}
        variant="outline"
        className="flex items-center gap-1 border-green-300 hover:bg-green-100 text-green-700 rounded-lg px-3 ml-auto"
      >
        <Download className="w-4 h-4" />
        Download
      </Button>
    </div>

    {/* Audio Player */}
    <audio
      controls
      className="w-full rounded-lg border border-green-200 shadow-sm focus:outline-none"
    >
      <source src={audioUrl} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  </div>
)}

            </CardContent>
          </Card>

          {/* Marketing Assistant Tool */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Share2 className="w-6 h-6 text-purple-600" />
                </div>
                Marketing Assistant
              </CardTitle>
              <CardDescription className="text-gray-600">
                Generate platform-specific marketing content and social media posts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.marketing && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-red-700">{errors.marketing}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="marketingProduct" className="text-sm font-medium text-gray-700">
                    Product Name
                  </Label>
                  <Input
                    id="marketingProduct"
                    value={marketingForm.product}
                    onChange={(e) => setMarketingForm((prev) => ({ ...prev, product: e.target.value }))}
                    placeholder="e.g., Handmade Leather Bag"
                    className="mt-1 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="platform" className="text-sm font-medium text-gray-700">
                      Platform
                    </Label>
                    <Select
                      value={marketingForm.platform}
                      onValueChange={(value) => setMarketingForm((prev) => ({ ...prev, platform: value }))}
                    >
                      <SelectTrigger className="mt-1 border-gray-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="marketingTone" className="text-sm font-medium text-gray-700">
                      Marketing Tone
                    </Label>
                    <Select
                      value={marketingForm.tone}
                      onValueChange={(value) => setMarketingForm((prev) => ({ ...prev, tone: value }))}
                    >
                      <SelectTrigger className="mt-1 border-gray-200 focus:border-purple-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  onClick={generateMarketing}
                  disabled={!marketingForm.product || loading.marketing}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading.marketing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Share2 className="w-5 h-5 mr-2" />
                      Generate Marketing Copy
                    </>
                  )}
                </Button>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Generated Marketing Content</Label>
                <ScrollableOutput
                  content={results.marketing}
                  placeholder="Generated marketing content will appear here..."
                  loading={loading.marketing}
                  onCopy={() => copyToClipboard(results.marketing)}
                />
                {results.marketing && (
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {marketingForm.platform}
                    </Badge>
                    <Badge variant="outline" className="border-purple-200 text-purple-600">
                      {marketingForm.tone}
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
