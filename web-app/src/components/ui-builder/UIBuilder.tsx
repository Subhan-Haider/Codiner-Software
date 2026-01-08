"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Palette,
  Code,
  Eye,
  Settings,
  Download,
  Upload,
  Undo,
  Redo,
  Move,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  Grid,
  MousePointer,
  Square,
  Type,
  Image,
  Layout,
  Save,
  Play,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { UIBuilderEngine, type UIComponent, type ComponentTemplate, type CanvasState } from "@/lib/ui-builder/ui-builder-engine"

interface DragData {
  type: 'component'
  templateId: string
}

export function UIBuilder() {
  const [engine] = useState(() => new UIBuilderEngine())
  const [canvasState, setCanvasState] = useState<CanvasState>(engine.getState())
  const [selectedComponent, setSelectedComponent] = useState<UIComponent | null>(null)
  const [draggedTemplate, setDraggedTemplate] = useState<ComponentTemplate | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [codeFormat, setCodeFormat] = useState<'html' | 'react' | 'vue' | 'angular'>('react')
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showCodeDialog, setShowCodeDialog] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = engine.subscribe((state) => {
      setCanvasState(state)
      const selected = state.components.find(c => c.id === state.selectedComponentId) || null
      setSelectedComponent(selected)
    })

    return unsubscribe
  }, [engine])

  const handleDragStart = useCallback((template: ComponentTemplate) => {
    setDraggedTemplate(template)
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedTemplate(null)
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()

    if (!draggedTemplate || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left - canvasState.zoom * 100 // Account for zoom and offset
    const y = event.clientY - rect.top - canvasState.zoom * 50

    const component = engine.addComponent(draggedTemplate.id, { x: x / canvasState.zoom, y: y / canvasState.zoom })

    if (component) {
      toast({
        title: "Component Added",
        description: `${component.name} has been added to the canvas`,
      })
    }

    handleDragEnd()
  }, [draggedTemplate, canvasState.zoom, engine, toast])

  const handleCanvasClick = useCallback((event: React.MouseEvent) => {
    if (event.target === canvasRef.current) {
      engine.selectComponent(null)
    }
  }, [engine])

  const handleComponentClick = useCallback((component: UIComponent, event: React.MouseEvent) => {
    event.stopPropagation()
    engine.selectComponent(component.id)
  }, [engine])

  const handleComponentMove = useCallback((componentId: string, deltaX: number, deltaY: number) => {
    const component = canvasState.components.find(c => c.id === componentId)
    if (!component) return

    engine.moveComponent(componentId, {
      x: component.position.x + deltaX / canvasState.zoom,
      y: component.position.y + deltaY / canvasState.zoom
    })
  }, [canvasState.components, canvasState.zoom, engine])

  const generateCode = useCallback(() => {
    const code = engine.generateCode(codeFormat)
    setGeneratedCode(code)
    setShowCodeDialog(true)

    toast({
      title: "Code Generated",
      description: `Generated ${codeFormat.toUpperCase()} code successfully`,
    })
  }, [engine, codeFormat, toast])

  const exportProject = useCallback(() => {
    const projectData = engine.exportProject()
    const blob = new Blob([projectData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ui-project.json'
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Project Exported",
      description: "Your UI project has been downloaded",
    })
  }, [engine, toast])

  const importProject = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const success = engine.importProject(e.target?.result as string)
      if (success) {
        toast({
          title: "Project Imported",
          description: "Your UI project has been loaded successfully",
        })
      } else {
        toast({
          title: "Import Failed",
          description: "Failed to import the project file",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)
  }, [engine, toast])

  const componentTemplates = engine.getComponentTemplates()
  const categories = [...new Set(componentTemplates.map(t => t.category))]

  return (
    <div className="h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
            <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">UI Builder</h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
              Drag & drop components to build your interface
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
          {/* Undo/Redo - Always visible */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => engine.undo()}
            disabled={!engine.canUndo()}
            className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 flex-shrink-0"
          >
            <Undo className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden lg:inline ml-2">Undo</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => engine.redo()}
            disabled={!engine.canRedo()}
            className="h-8 w-8 sm:h-9 sm:w-auto sm:px-3 flex-shrink-0"
          >
            <Redo className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden lg:inline ml-2">Redo</span>
          </Button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Zoom Controls - Hidden on small screens */}
          <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => engine.setZoom(canvasState.zoom * 1.2)}
              className="h-8 w-8"
            >
              <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 min-w-[2.5rem] sm:min-w-[3rem] text-center">
              {Math.round(canvasState.zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => engine.setZoom(canvasState.zoom * 0.8)}
              className="h-8 w-8"
            >
              <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Preview Mode */}
          <Button
            variant={isPreviewMode ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="h-8 px-2 sm:px-3 flex-shrink-0"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          {/* Generate Code - Primary action */}
          <Button onClick={generateCode} className="h-8 px-2 sm:px-4 flex-shrink-0">
            <Code className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
            <span className="hidden sm:inline">Generate</span>
          </Button>

          {/* Export/Import - Hidden on small screens */}
          <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
            <Button variant="outline" onClick={exportProject} className="h-8 px-2 sm:px-3">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden lg:inline">Export</span>
            </Button>

            <Button variant="outline" asChild className="h-8 px-2 sm:px-3">
              <label>
                <Upload className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden lg:inline">Import</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={importProject}
                  className="hidden"
                />
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Component Palette */}
        <div className="w-full lg:w-72 xl:w-80 bg-white dark:bg-slate-800 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 flex flex-col max-h-64 lg:max-h-none">
          <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm sm:text-base">Components</h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hidden sm:block">
              Drag components onto the canvas to build your UI
            </p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-3 sm:p-4 space-y-4 sm:space-y-6">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    {category === 'Layout' && <Layout className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />}
                    {category === 'Basic' && <Square className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />}
                    {category === 'Form' && <Type className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />}
                    {category === 'Media' && <Image className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />}
                    {category}
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3">
                    {componentTemplates
                      .filter(template => template.category === category)
                      .map(template => (
                        <div
                          key={template.id}
                          draggable
                          onDragStart={() => handleDragStart(template)}
                          onDragEnd={handleDragEnd}
                          className={`
                            p-2 sm:p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-move
                            hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md
                            transition-all bg-white dark:bg-slate-700 min-h-[60px] sm:min-h-[70px]
                            touch-manipulation
                            ${isDragging && draggedTemplate?.id === template.id ? 'opacity-50' : ''}
                          `}
                        >
                          <div className="text-xl sm:text-2xl mb-1 sm:mb-2 flex justify-center">{template.icon}</div>
                          <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-white text-center">
                            {template.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 hidden sm:block text-center">
                            {template.description}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {canvasState.components.length} components
                </Badge>
                <Badge variant="outline" className="text-xs hidden sm:inline-flex flex-shrink-0">
                  Zoom: {Math.round(canvasState.zoom * 100)}%
                </Badge>
                <Badge variant="outline" className="text-xs hidden md:inline-flex flex-shrink-0">
                  Grid: {canvasState.gridSize}px
                </Badge>
              </div>

              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => engine.toggleSnapToGrid()}
                  className={`h-8 w-8 sm:h-9 sm:w-auto sm:px-3 ${canvasState.snapToGrid ? 'bg-purple-100 dark:bg-purple-900' : ''}`}
                >
                  <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline ml-2">Snap</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden bg-slate-100 dark:bg-slate-900">
            {/* Canvas Grid */}
            <div
              ref={canvasRef}
              className={`
                absolute inset-0 cursor-crosshair
                ${canvasState.snapToGrid ? 'bg-grid-pattern' : ''}
              `}
              style={{
                backgroundImage: canvasState.snapToGrid
                  ? `radial-gradient(circle, #94a3b8 1px, transparent 1px)`
                  : undefined,
                backgroundSize: `${canvasState.gridSize * canvasState.zoom}px ${canvasState.gridSize * canvasState.zoom}px`,
                transform: `scale(${canvasState.zoom})`,
                transformOrigin: 'top left'
              }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={handleCanvasClick}
            >
              {/* Components */}
              {canvasState.components.map(component => (
                <div
                  key={component.id}
                  className={`
                    absolute border-2 rounded-lg cursor-move select-none
                    ${component.id === canvasState.selectedComponentId
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                    }
                    ${isPreviewMode ? 'pointer-events-none' : ''}
                  `}
                  style={{
                    left: component.position.x,
                    top: component.position.y,
                    width: component.position.width,
                    height: component.position.height,
                    minWidth: 50,
                    minHeight: 30
                  }}
                  onClick={(e) => handleComponentClick(component, e)}
                  onMouseDown={(e) => {
                    if (isPreviewMode) return

                    const startX = e.clientX
                    const startY = e.clientY
                    const startLeft = component.position.x
                    const startTop = component.position.y

                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const deltaX = moveEvent.clientX - startX
                      const deltaY = moveEvent.clientY - startY
                      handleComponentMove(component.id, deltaX, deltaY)
                    }

                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove)
                      document.removeEventListener('mouseup', handleMouseUp)
                    }

                    document.addEventListener('mousemove', handleMouseMove)
                    document.addEventListener('mouseup', handleMouseUp)
                  }}
                >
                  {/* Component Content */}
                  <div className="w-full h-full flex items-center justify-center text-slate-600 dark:text-slate-400">
                    <span className="text-lg mr-2">{component.icon}</span>
                    <span className="text-sm font-medium">{component.name}</span>
                  </div>

                  {/* Resize Handles */}
                  {!isPreviewMode && component.id === canvasState.selectedComponentId && (
                    <>
                      <div
                        className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-500 rounded-full cursor-se-resize border border-white"
                        onMouseDown={(e) => {
                          e.stopPropagation()
                          const startX = e.clientX
                          const startY = e.clientY
                          const startWidth = component.position.width
                          const startHeight = component.position.height

                          const handleMouseMove = (moveEvent: MouseEvent) => {
                            const deltaX = moveEvent.clientX - startX
                            const deltaY = moveEvent.clientY - startY
                            engine.resizeComponent(component.id, {
                              width: startWidth + deltaX / canvasState.zoom,
                              height: startHeight + deltaY / canvasState.zoom
                            })
                          }

                          const handleMouseUp = () => {
                            document.removeEventListener('mousemove', handleMouseMove)
                            document.removeEventListener('mouseup', handleMouseUp)
                          }

                          document.addEventListener('mousemove', handleMouseMove)
                          document.addEventListener('mouseup', handleMouseUp)
                        }}
                      />
                    </>
                  )}
                </div>
              ))}

              {/* Drop Zone Indicator */}
              {isDragging && (
                <div className="absolute inset-0 border-2 border-dashed border-purple-400 bg-purple-100 dark:bg-purple-900/20 pointer-events-none" />
              )}
            </div>

            {/* Canvas Controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => engine.setZoom(1)}
              >
                Reset Zoom
              </Button>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 flex flex-col">
          {selectedComponent ? (
            <>
              <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                      {selectedComponent.name}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {selectedComponent.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => engine.removeComponent(selectedComponent.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Position</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <Label className="text-xs text-slate-600">X</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedComponent.position.x)}
                          onChange={(e) => engine.moveComponent(selectedComponent.id, {
                            x: parseInt(e.target.value) || 0,
                            y: selectedComponent.position.y
                          })}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Y</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedComponent.position.y)}
                          onChange={(e) => engine.moveComponent(selectedComponent.id, {
                            x: selectedComponent.position.x,
                            y: parseInt(e.target.value) || 0
                          })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Size</Label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div>
                        <Label className="text-xs text-slate-600">Width</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedComponent.position.width)}
                          onChange={(e) => engine.resizeComponent(selectedComponent.id, {
                            width: parseInt(e.target.value) || 50,
                            height: selectedComponent.position.height
                          })}
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-slate-600">Height</Label>
                        <Input
                          type="number"
                          value={Math.round(selectedComponent.position.height)}
                          onChange={(e) => engine.resizeComponent(selectedComponent.id, {
                            width: selectedComponent.position.width,
                            height: parseInt(e.target.value) || 30
                          })}
                          className="text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Component Properties */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Properties</Label>
                    {selectedComponent.properties.map(property => (
                      <div key={property.id}>
                        <Label className="text-xs text-slate-600">{property.label}</Label>
                        {property.type === 'string' && (
                          <Input
                            value={property.value}
                            onChange={(e) => engine.updateComponentProperty(selectedComponent.id, property.name, e.target.value)}
                            className="text-sm mt-1"
                          />
                        )}
                        {property.type === 'number' && (
                          <Input
                            type="number"
                            value={property.value}
                            onChange={(e) => engine.updateComponentProperty(selectedComponent.id, property.name, parseInt(e.target.value) || 0)}
                            className="text-sm mt-1"
                          />
                        )}
                        {property.type === 'boolean' && (
                          <div className="flex items-center space-x-2 mt-1">
                            <input
                              type="checkbox"
                              checked={property.value}
                              onChange={(e) => engine.updateComponentProperty(selectedComponent.id, property.name, e.target.checked)}
                              className="rounded"
                            />
                            <span className="text-sm">{property.value ? 'Enabled' : 'Disabled'}</span>
                          </div>
                        )}
                        {property.type === 'color' && (
                          <Input
                            type="color"
                            value={property.value}
                            onChange={(e) => engine.updateComponentProperty(selectedComponent.id, property.name, e.target.value)}
                            className="text-sm mt-1 h-10"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <MousePointer className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No Component Selected
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Click on a component in the canvas to edit its properties
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Generation Dialog */}
      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Generated Code</DialogTitle>
            <DialogDescription>
              Copy the generated code for your chosen framework
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={codeFormat} onValueChange={(value: any) => setCodeFormat(value)}>
                <SelectContent>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                  <SelectItem value="html">HTML + CSS</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => navigator.clipboard.writeText(generatedCode)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>

            <ScrollArea className="h-96">
              <pre className="text-sm font-mono bg-slate-100 dark:bg-slate-800 p-4 rounded whitespace-pre-wrap">
                {generatedCode}
              </pre>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
