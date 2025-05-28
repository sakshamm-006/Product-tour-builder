"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Home,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Clock,
  Users,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const demoSteps = [
  {
    id: 1,
    title: "Welcome to Your Dashboard",
    description:
      "This is your command center where you can see all your projects, analytics, and team activity at a glance. Monitor your tour performance with real-time insights and engagement metrics.",
    image: "/placeholder.svg?height=500&width=800",
    highlight: { x: 50, y: 100, width: 300, height: 120 },
    duration: 4000,
    stats: { views: "2.4k", engagement: "87%", completion: "73%" },
  },
  {
    id: 2,
    title: "Create Your First Project",
    description:
      "Click the 'New Project' button to start building your first interactive tour. Our AI-powered builder will guide you through the process with smart suggestions and templates.",
    image: "/placeholder.svg?height=500&width=800",
    highlight: { x: 600, y: 50, width: 150, height: 50 },
    duration: 3500,
    stats: { templates: "50+", time: "5 min", difficulty: "Easy" },
  },
  {
    id: 3,
    title: "Customize Your Tour",
    description:
      "Use our intuitive drag-and-drop editor to add steps, customize animations, and make your tour perfect. Preview changes in real-time as you build your interactive experience.",
    image: "/placeholder.svg?height=500&width=800",
    highlight: { x: 100, y: 200, width: 500, height: 200 },
    duration: 4500,
    stats: { animations: "20+", themes: "12", responsive: "100%" },
  },
  {
    id: 4,
    title: "Share and Analyze",
    description:
      "Publish your tour with a single click and track engagement with detailed analytics. See how users interact with each step and optimize for better conversion rates.",
    image: "/placeholder.svg?height=500&width=800",
    highlight: { x: 400, y: 300, width: 250, height: 100 },
    duration: 4000,
    stats: { sharing: "Instant", analytics: "Real-time", integrations: "25+" },
  },
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying && !isCompleted) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStep()
            return 0
          }
          return prev + 100 / (demoSteps[currentStep]?.duration / 100)
        })
      }, 100)
    } else {
      setProgress(0)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentStep, isCompleted])

  const nextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
    } else {
      setIsCompleted(true)
      setIsAutoPlaying(false)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
    }
  }

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setIsCompleted(false)
    setProgress(0)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
    if (!isAutoPlaying) {
      setProgress(0)
    }
  }

  const restartDemo = () => {
    setCurrentStep(0)
    setIsCompleted(false)
    setProgress(0)
    setIsAutoPlaying(false)
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-lg mx-auto p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">🎉 Demo Complete!</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              You've experienced the power of interactive tours. Ready to create your own masterpiece?
            </p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-4 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-gray-600">Steps Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2:30</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/editor">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building
              </Button>
            </Link>
            <Button onClick={restartDemo} size="lg" variant="outline">
              <RotateCcw className="w-5 h-5 mr-2" />
              Restart Demo
            </Button>
            <Link href="/">
              <Button size="lg" variant="outline">
                <Home className="w-5 h-5 mr-2" />
                Back Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 text-gray-700 hover:text-purple-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Progress Indicator */}
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Step {currentStep + 1} of {demoSteps.length}
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Auto-play Controls */}
            <div className="flex items-center space-x-2">
              <Button onClick={toggleAutoPlay} variant="outline" size="sm" className="flex items-center space-x-2">
                {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isAutoPlaying ? "Pause" : "Auto Play"}</span>
              </Button>
              {isAutoPlaying && (
                <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-purple-600" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Enhanced Timeline Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-gray-900">Interactive Demo</h1>
              <p className="text-lg text-gray-600">
                Experience how TourCraft makes product tours engaging and effective.
              </p>

              {/* Demo Stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 text-center">
                  <Eye className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-gray-900">Live Demo</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 text-center">
                  <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-gray-900">Interactive</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 text-center">
                  <Clock className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-semibold text-gray-900">3 min</div>
                </div>
              </div>
            </div>

            {/* Enhanced Steps */}
            <div className="space-y-4">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`relative flex items-start space-x-4 p-5 rounded-xl cursor-pointer transition-all duration-300 ${
                    index === currentStep
                      ? "bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 shadow-lg"
                      : index < currentStep
                        ? "bg-green-50 border-2 border-green-200"
                        : "bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-gray-300 hover:shadow-md"
                  }`}
                  onClick={() => goToStep(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Step Number */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-lg ${
                      index === currentStep
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        : index < currentStep
                          ? "bg-green-600 text-white"
                          : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{step.description}</p>

                    {/* Step Stats */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      {Object.entries(step.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-1">
                          <span className="capitalize">{key}:</span>
                          <span className="font-medium text-gray-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {index === currentStep && (
                    <motion.div
                      className="absolute right-3 top-3 w-3 h-3 bg-purple-600 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Enhanced Navigation Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button onClick={prevStep} disabled={currentStep === 0} variant="outline" className="flex-1">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={nextStep} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                {currentStep === demoSteps.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Enhanced Demo Screen */}
          <div className="lg:col-span-3 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
              >
                {/* Enhanced Browser Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded-md px-4 py-2 text-sm text-gray-500 font-mono flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    https://app.tourcraft.com/dashboard
                  </div>
                  <div className="text-xs text-gray-400">Live Demo</div>
                </div>

                {/* Demo Content */}
                <div className="relative bg-gradient-to-br from-gray-50 to-blue-50">
                  <Image
                    src={demoSteps[currentStep].image || "/placeholder.svg"}
                    alt={demoSteps[currentStep].title}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />

                  {/* Enhanced Highlight */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <div
                      className="absolute border-4 border-purple-500 rounded-lg shadow-2xl"
                      style={{
                        left: demoSteps[currentStep].highlight.x,
                        top: demoSteps[currentStep].highlight.y,
                        width: demoSteps[currentStep].highlight.width,
                        height: demoSteps[currentStep].highlight.height,
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 bg-purple-500 rounded"
                      />
                    </div>
                  </motion.div>

                  {/* Enhanced Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="absolute bottom-6 left-6 right-6 bg-white rounded-xl shadow-2xl border border-gray-200 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{currentStep + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{demoSteps[currentStep].title}</h3>
                        <p className="text-gray-600 leading-relaxed">{demoSteps[currentStep].description}</p>

                        {/* Tooltip Stats */}
                        <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                          {Object.entries(demoSteps[currentStep].stats).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-500 capitalize">{key}: </span>
                              <span className="font-medium text-purple-600">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
