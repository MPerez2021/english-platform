"use client"

import * as React from "react"
import { type Editor } from "@tiptap/react"
import { useHotkeys } from "react-hotkeys-hook"

// --- Hooks ---
import { useTiptapEditor } from "@/app/(admin)/_components/text-editor/hooks/use-tiptap-editor"
import { useIsMobile } from "@/hooks/use-mobile"

// --- Lib ---
import { isMarkInSchema, isNodeTypeSelected } from "@/app/(admin)/_components/text-editor/tiptap-utils"

// --- Icons ---
import { HighlighterIcon } from "@/app/(admin)/_components/text-editor/tiptap-icons/highlighter-icon"

export const COLOR_HIGHLIGHT_SHORTCUT_KEY = "mod+shift+h"
export const HIGHLIGHT_COLORS = [
  {
    label: "Yellow background",
    value: "hsl(48 96% 89%)",
    border: "hsl(48 96% 70%)",
  },
  {
    label: "Green background",
    value: "hsl(142 76% 85%)",
    border: "hsl(142 76% 65%)",
  },
  {
    label: "Blue background",
    value: "hsl(199 89% 85%)",
    border: "hsl(199 89% 65%)",
  },
  {
    label: "Purple background",
    value: "hsl(270 89% 90%)",
    border: "hsl(270 89% 70%)",
  },
  {
    label: "Red background",
    value: "hsl(0 93% 88%)",
    border: "hsl(0 93% 68%)",
  },
]
export type HighlightColor = (typeof HIGHLIGHT_COLORS)[number]

/**
 * Configuration for the color highlight functionality
 */
export interface UseColorHighlightConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * The color to apply when toggling the highlight.
   */
  highlightColor?: string
  /**
   * Optional label to display alongside the icon.
   */
  label?: string
  /**
   * Whether the button should hide when the mark is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Called when the highlight is applied.
   */
  onApplied?: ({ color, label }: { color: string; label: string }) => void
}

export function pickHighlightColorsByValue(values: string[]) {
  const colorMap = new Map(
    HIGHLIGHT_COLORS.map((color) => [color.value, color])
  )
  return values
    .map((value) => colorMap.get(value))
    .filter((color): color is (typeof HIGHLIGHT_COLORS)[number] => !!color)
}

export function canColorHighlight(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isMarkInSchema("highlight", editor) ||
    isNodeTypeSelected(editor, ["image"])
  )
    return false

  return editor.can().setMark("highlight")
}

export function isColorHighlightActive(
  editor: Editor | null,
  highlightColor?: string
): boolean {
  if (!editor || !editor.isEditable) return false
  return highlightColor
    ? editor.isActive("highlight", { color: highlightColor })
    : editor.isActive("highlight")
}

export function removeHighlight(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (!canColorHighlight(editor)) return false

  return editor.chain().focus().unsetMark("highlight").run()
}

export function shouldShowButton(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false
  if (!isMarkInSchema("highlight", editor)) return false

  if (hideWhenUnavailable && !editor.isActive("code")) {
    return canColorHighlight(editor)
  }

  return true
}

export function useColorHighlight(config: UseColorHighlightConfig) {
  const {
    editor: providedEditor,
    label,
    highlightColor,
    hideWhenUnavailable = false,
    onApplied,
  } = config

  const { editor } = useTiptapEditor(providedEditor)
  const isMobile = useIsMobile()
  const [isVisible, setIsVisible] = React.useState<boolean>(true)
  const canColorHighlightState = canColorHighlight(editor)
  const isActive = isColorHighlightActive(editor, highlightColor)

  React.useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowButton({ editor, hideWhenUnavailable }))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  const handleColorHighlight = React.useCallback(() => {
    if (!editor || !canColorHighlightState || !highlightColor || !label)
      return false

    if (editor.state.storedMarks) {
      const highlightMarkType = editor.schema.marks.highlight
      if (highlightMarkType) {
        editor.view.dispatch(
          editor.state.tr.removeStoredMark(highlightMarkType)
        )
      }
    }

    setTimeout(() => {
      const success = editor
        .chain()
        .focus()
        .toggleMark("highlight", { color: highlightColor })
        .run()
      if (success) {
        onApplied?.({ color: highlightColor, label })
      }
      return success
    }, 0)
  }, [canColorHighlightState, highlightColor, editor, label, onApplied])

  const handleRemoveHighlight = React.useCallback(() => {
    const success = removeHighlight(editor)
    if (success) {
      onApplied?.({ color: "", label: "Remove highlight" })
    }
    return success
  }, [editor, onApplied])

  useHotkeys(
    COLOR_HIGHLIGHT_SHORTCUT_KEY,
    (event) => {
      event.preventDefault()
      handleColorHighlight()
    },
    {
      enabled: isVisible && canColorHighlightState,
      enableOnContentEditable: !isMobile,
      enableOnFormTags: true,
    }
  )

  return {
    isVisible,
    isActive,
    handleColorHighlight,
    handleRemoveHighlight,
    canColorHighlight: canColorHighlightState,
    label: label || `Highlight`,
    shortcutKeys: COLOR_HIGHLIGHT_SHORTCUT_KEY,
    Icon: HighlighterIcon,
  }
}
