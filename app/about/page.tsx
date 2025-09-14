import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Globe, Users, Sparkles, Award, TrendingUp, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const stats = [
    { label: "Active Artisans", value: "2,500+", icon: Users },
    { label: "Countries", value: "45+", icon: Globe },
    { label: "Products Sold", value: "50,000+", icon: TrendingUp },
    { label: "Customer Satisfaction", value: "98%", icon: Heart },
  ]

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Tools",
      description:
        "Help artisans create compelling product descriptions, translate content, and generate marketing materials with advanced AI technology.",
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description:
        "Connect local artisans with customers worldwide, breaking down geographical barriers and expanding market reach.",
    },
    {
      icon: Shield,
      title: "Fair Trade Practices",
      description:
        "Ensure artisans receive fair compensation for their work while maintaining authentic cultural traditions.",
    },
    {
      icon: Zap,
      title: "Digital Empowerment",
      description: "Provide modern tools and training to help traditional craftspeople thrive in the digital economy.",
    },
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former tech executive passionate about preserving traditional crafts through technology.",
      image: "/sarah-chen-avatar.jpg",
    },
    {
      name: "Raj Patel",
      role: "Head of AI",
      bio: "AI researcher focused on language technologies and cultural preservation.",
      image: "/raj-patel-avatar.jpg",
    },
    {
      name: "Maria Santos",
      role: "Artisan Relations",
      bio: "Cultural anthropologist working directly with artisan communities worldwide.",
      image: "/maria-santos-avatar.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Empowering Artisans Through Technology</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            ArtisanAI bridges the gap between traditional craftsmanship and modern technology, helping local artisans
            reach global markets while preserving their cultural heritage.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Join as Artisan
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" variant="outline">
                Explore Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <stat.icon className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                We believe that traditional craftsmanship is a treasure that deserves to thrive in the modern world. Our
                platform combines cutting-edge AI technology with deep respect for cultural heritage, creating
                opportunities for artisans to share their stories and reach customers who value authenticity.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                By providing AI-powered tools for storytelling, translation, and marketing, we help artisans overcome
                language barriers and digital divides while maintaining the integrity of their craft.
              </p>
              <div className="flex gap-4">
                <Badge className="bg-orange-100 text-orange-800 px-4 py-2">
                  <Award className="w-4 h-4 mr-2" />
                  Fair Trade Certified
                </Badge>
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  <Shield className="w-4 h-4 mr-2" />
                  Ethical Sourcing
                </Badge>
              </div>
            </div>
            <div className="relative h-96">
              <Image
                src="/artisan-working.jpg"
                alt="Artisan at work"
                fill
                className="object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = "/artisan-working-on-craft.jpg"
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Make a Difference</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive support for artisans at every stage of their digital journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Passionate individuals dedicated to empowering artisans worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <div className="w-24 h-24 mx-auto mb-4 relative">
                    <Image
                      src={member.image || "/placeholder.svg?height=96&width=96&query=team+member+avatar"}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Whether you're an artisan looking to share your craft or a customer seeking authentic handmade products,
            we'd love to have you as part of our global community.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/onboarding">
              <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                Become an Artisan
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
              >
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
