"use client"

import { motion } from "framer-motion"
import { Play, Sparkles, Zap, Target, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            TourCraft
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <Link href="/editor">
            <Button variant="ghost">Editor</Button>
          </Link>
          <Link href="/demo">
            <Button>Try Demo</Button>
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Create{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Interactive
              </span>
              <br />
              Product Tours
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Build engaging product demos and user onboarding experiences with our intuitive tour builder. No coding
              required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/demo">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Demo
              </Button>
            </Link>
            <Link href="/editor">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
                Build Your Own
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          <div className="text-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Lightning Fast</h3>
            <p className="text-gray-600">Create professional product tours in minutes, not hours.</p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Pixel Perfect</h3>
            <p className="text-gray-600">Beautiful, responsive tours that work on any device.</p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold">Interactive Magic</h3>
            <p className="text-gray-600">Engage users with smooth animations and interactions.</p>
          </div>
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 text-center"
        >
          <h2 className="text-3xl font-bold mb-8">See It In Action</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <div className="ml-4 text-sm text-gray-500">TourCraft Demo</div>
              </div>
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                <Link href="/demo">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-50 shadow-lg">
                    <Play className="w-6 h-6 mr-2" />
                    Launch Interactive Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
