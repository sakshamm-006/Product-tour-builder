"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Trash2, Eye, Save, ArrowLeft, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

interface TourStep {
  id: string
  title: string
  description: string
  imageUrl: string
}

export default function EditorPage() {
  const [steps, setSteps] = useState<TourStep[]>([])
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [currentPreviewStep, setCurrentPreviewStep] = useState(0)
  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    imageUrl: "",
  })

  // Load saved steps from localStorage on component mount
  useEffect(() => {
    const savedSteps = localStorage.getItem("tourSteps")
    if (savedSteps) {
      setSteps(JSON.parse(savedSteps))
    }
  }, [])

  // Save steps to localStorage whenever steps change
  useEffect(() => {
    localStorage.setItem("tourSteps", JSON.stringify(steps))
  }, [steps])

  const addStep = () => {
    if (newStep.title && newStep.description) {
      const step: TourStep = {
        id: Date.now().toString(),
        title: newStep.title,
        description: newStep.description,
        imageUrl: newStep.imageUrl || "/placeholder.svg?height=300&width=500",
      }
      setSteps([...steps, step])
      setNewStep({ title: "", description: "", imageUrl: "" })
    }
  }

  const deleteStep = (id: string) => {
    setSteps(steps.filter((step) => step.id !== id))
  }

  const moveStep = (fromIndex: number, toIndex: number) => {
    const newSteps = [...steps]
    const [movedStep] = newSteps.splice(fromIndex, 1)
    newSteps.splice(toIndex, 0, movedStep)
    setSteps(newSteps)
  }

  const nextPreviewStep = () => {
    if (currentPreviewStep < steps.length - 1) {
      setCurrentPreviewStep(currentPreviewStep + 1)
    }
  }

  const prevPreviewStep = () => {
    if (currentPreviewStep > 0) {
      setCurrentPreviewStep(currentPreviewStep - 1)
    }
  }

  if (isPreviewMode && steps.length > 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Preview Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Button onClick={() => setIsPreviewMode(false)} variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Editor</span>
            </Button>
            <div className="text-sm text-gray-500">
              Step {currentPreviewStep + 1} of {steps.length}
            </div>
          </div>
        </header>

        {/* Preview Content */}
        <div className="max-w-4xl mx-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPreviewStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={steps[currentPreviewStep].imageUrl || "/placeholder.svg"}
                  alt={steps[currentPreviewStep].title}
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl border border-gray-200 p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{steps[currentPreviewStep].title}</h3>
                  <p className="text-gray-600">{steps[currentPreviewStep].description}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button onClick={prevPreviewStep} disabled={currentPreviewStep === 0} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPreviewStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentPreviewStep ? "bg-purple-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button onClick={nextPreviewStep} disabled={currentPreviewStep === steps.length - 1}>
              Next
              <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button onClick={() => setIsPreviewMode(true)} disabled={steps.length === 0} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview Tour
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Tour
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Tour Editor</h1>
              <p className="text-gray-600">Create engaging product tours step by step.</p>
            </div>

            {/* Add New Step Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Step</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Step Title</Label>
                  <Input
                    id="title"
                    value={newStep.title}
                    onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                    placeholder="Enter step title..."
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newStep.description}
                    onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                    placeholder="Describe what happens in this step..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    value={newStep.imageUrl}
                    onChange={(e) => setNewStep({ ...newStep, imageUrl: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <Button onClick={addStep} disabled={!newStep.title || !newStep.description} className="w-full">
                  Add Step
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Steps List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Tour Steps ({steps.length})</h2>
            </div>

            {steps.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Plus className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No steps yet</h3>
                  <p className="text-gray-600">Add your first step to get started building your tour.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                                {step.imageUrl && (
                                  <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                                    <Image
                                      src={step.imageUrl || "/placeholder.svg"}
                                      alt={step.title}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                              <Button
                                onClick={() => deleteStep(step.id)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
