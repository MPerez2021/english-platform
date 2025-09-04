"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, BookOpen, GraduationCap } from "lucide-react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type TopicData, type Level, LEVELS } from "@/lib/topic-data"

interface TopicSidebarProps {
  topicData: TopicData
  selectedLevel: Level | null
  selectedCategory: string | null
  selectedSubcategory: string | null
  onLevelChange: (level: Level | null) => void
  onCategoryChange: (category: string | null) => void
  onSubcategoryChange: (subcategory: string | null) => void
}

export function TopicSidebar({
  topicData,
  selectedLevel,
  selectedCategory,
  selectedSubcategory,
  onLevelChange,
  onCategoryChange,
  onSubcategoryChange,
}: TopicSidebarProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      onCategoryChange(null)
      onSubcategoryChange(null)
    } else {
      onCategoryChange(categoryId)
      onSubcategoryChange(null)
      toggleCategory(categoryId)
    }
  }

  const handleSubcategoryClick = (subcategoryId: string) => {
    if (selectedSubcategory === subcategoryId) {
      onSubcategoryChange(null)
    } else {
      onSubcategoryChange(subcategoryId)
    }
  }

  const handleLevelClick = (level: Level) => {
    if (selectedLevel === level) {
      onLevelChange(null)
    } else {
      onLevelChange(level)
    }
  }

  return (
    <Sidebar className="w-80 border-r bg-background">
      <SidebarContent className="p-4">
        {/* Topic Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5" />
            {topicData.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {topicData.description}
          </p>
        </div>

        {/* Level Filter */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Proficiency Level
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-3 gap-2">
              {LEVELS.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleLevelClick(level)}
                  className={cn(
                    "h-8 text-xs font-medium",
                    selectedLevel === level && "bg-primary text-primary-foreground"
                  )}
                >
                  {level}
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topicData.categories.map((category) => {
                const isOpen = openCategories.has(category.id)
                const isSelected = selectedCategory === category.id
                
                return (
                  <Collapsible
                    key={category.id}
                    open={isOpen}
                    onOpenChange={() => toggleCategory(category.id)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between gap-3 px-3 py-2 h-auto font-medium group",
                            isSelected && "bg-accent text-accent-foreground"
                          )}
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-medium">{category.name}</span>
                            <Badge variant="secondary" className="text-xs">
                              {category.subcategories.length}
                            </Badge>
                          </span>
                          {isOpen ? (
                            <ChevronDown className="h-4 w-4 transition-transform" />
                          ) : (
                            <ChevronRight className="h-4 w-4 transition-transform" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-1">
                        <div className="ml-4 space-y-1">
                          {category.subcategories.map((subcategory) => {
                            const isSubSelected = selectedSubcategory === subcategory.id
                            
                            return (
                              <Button
                                key={subcategory.id}
                                variant={isSubSelected ? "secondary" : "ghost"}
                                size="sm"
                                className={cn(
                                  "w-full justify-start h-8 px-3 font-normal",
                                  isSubSelected && "bg-secondary text-secondary-foreground"
                                )}
                                onClick={() => handleSubcategoryClick(subcategory.id)}
                              >
                                <span className="flex items-center justify-between w-full">
                                  <span className="text-sm">{subcategory.name}</span>
                                  <Badge variant="outline" className="text-xs ml-2">
                                    {subcategory.exercises.length}
                                  </Badge>
                                </span>
                              </Button>
                            )
                          })}
                        </div>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Filter Summary */}
        {(selectedLevel || selectedCategory || selectedSubcategory) && (
          <SidebarGroup>
            <SidebarGroupLabel>Active Filters</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2">
                {selectedLevel && (
                  <Badge 
                    variant="default" 
                    className="text-xs cursor-pointer"
                    onClick={() => onLevelChange(null)}
                  >
                    Level: {selectedLevel} ✕
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs cursor-pointer"
                    onClick={() => {
                      onCategoryChange(null)
                      onSubcategoryChange(null)
                    }}
                  >
                    {topicData.categories.find(c => c.id === selectedCategory)?.name} ✕
                  </Badge>
                )}
                {selectedSubcategory && (
                  <Badge 
                    variant="outline" 
                    className="text-xs cursor-pointer"
                    onClick={() => onSubcategoryChange(null)}
                  >
                    {topicData.categories
                      .find(c => c.id === selectedCategory)
                      ?.subcategories.find(s => s.id === selectedSubcategory)?.name} ✕
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-xs mt-2"
                onClick={() => {
                  onLevelChange(null)
                  onCategoryChange(null)
                  onSubcategoryChange(null)
                }}
              >
                Clear All Filters
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}