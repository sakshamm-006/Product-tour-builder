"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  TrendingUp,
  Clock,
  Play,
  BarChart3,
  Settings,
  Bell,
  Download,
  Share2,
  Sparkles,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Product Onboarding Tour",
    description: "Interactive walkthrough for new users",
    status: "Published",
    views: 2847,
    completion: 87,
    lastUpdated: "2 hours ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Onboarding",
  },
  {
    id: 2,
    title: "Feature Announcement",
    description: "Showcase new dashboard features",
    status: "Draft",
    views: 0,
    completion: 0,
    lastUpdated: "1 day ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Marketing",
  },
  {
    id: 3,
    title: "Sales Demo Presentation",
    description: "Interactive demo for prospects",
    status: "Published",
    views: 1523,
    completion: 92,
    lastUpdated: "3 days ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Sales",
  },
  {
    id: 4,
    title: "API Documentation Tour",
    description: "Guide developers through API usage",
    status: "Published",
    views: 756,
    completion: 78,
    lastUpdated: "1 week ago",
    thumbnail: "/placeholder.svg?height=200&width=300",
    category: "Documentation",
  },
]

const stats = [
  {
    title: "Total Views",
    value: "12.4k",
    change: "+23%",
    icon: Eye,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Avg. Completion",
    value: "84%",
    change: "+5%",
    icon: Target,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Tours",
    value: "8",
    change: "+2",
    icon: Play,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Engagement Rate",
    value: "91%",
    change: "+12%",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Tour completed",
    project: "Product Onboarding Tour",
    user: "Sarah Chen",
    time: "2 minutes ago",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    action: "New tour created",
    project: "Feature Announcement",
    user: "Mike Johnson",
    time: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    action: "Tour shared",
    project: "Sales Demo Presentation",
    user: "Emily Rodriguez",
    time: "3 hours ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
]

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", "Onboarding", "Marketing", "Sales", "Documentation"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                TourCraft
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-purple-600 font-medium">
                Dashboard
              </Link>
              <Link href="/editor" className="text-gray-600 hover:text-purple-600 transition-colors">
                Editor
              </Link>
              <Link href="/analytics" className="text-gray-600 hover:text-purple-600 transition-colors">
                Analytics
              </Link>
              <Link href="/settings" className="text-gray-600 hover:text-purple-600 transition-colors">
                Settings
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Alex! 👋</h1>
              <p className="text-lg text-gray-600">Here's what's happening with your tours today.</p>
            </div>
            <Link href="/editor">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
                <Plus className="w-5 h-5 mr-2" />
                Create New Tour
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p
                      className={`text-sm font-medium mt-1 ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search tours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/80 backdrop-blur-sm"
                />
              </div>
              <div className="flex items-center space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-purple-600 text-white" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">{project.title}</h3>
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    project.status === "Published"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {project.status}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-3">{project.description}</p>

                              <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{project.views.toLocaleString()} views</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Target className="w-4 h-4" />
                                  <span>{project.completion}% completion</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{project.lastUpdated}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/editor">
                    <Button className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Tour
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button variant="outline" className="w-full justify-start">
                      <Play className="w-4 h-4 mr-2" />
                      View Demo
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <img
                        src={activity.avatar || "/placeholder.svg"}
                        alt={activity.user}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-sm text-purple-600 truncate">{activity.project}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Chart */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <Card className="bg-white/80 backdrop-blur-sm border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">This Week</span>
                      <span className="text-sm font-medium text-green-600">+23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">847</div>
                        <div className="text-xs text-gray-500">New Views</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">92%</div>
                        <div className="text-xs text-gray-500">Completion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
