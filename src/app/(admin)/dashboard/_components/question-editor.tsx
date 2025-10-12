import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export type QuestionPart =
  | { type: "text"; value: string }
  | { type: "blank"; id: string; hint?: string };
interface QuestionEditorProps {
  questionParts: QuestionPart[];
  onChange: (index: number, part: QuestionPart) => void;
  onRemove: (index: number) => void;
}

export default function QuestionEditor({
  questionParts,
  onChange,
  onRemove,
}: QuestionEditorProps) {
  return (
    <div className="space-y-3">
      {questionParts.map((part, i) => (
        <div key={i} className="flex items-center gap-2">
          {part.type === "text" ? (
            <>
              <Input
                type="text"
                value={part.value}
                placeholder="Enter text"
                onChange={(e) =>
                  onChange(i, { ...part, value: e.target.value })
                }
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onRemove(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex-1 flex gap-2 items-center">
                <span className="px-3 py-2 border rounded-md bg-muted text-sm">
                  [ blank ]
                </span>
                <Input
                  type="text"
                  placeholder="Hint (optional)"
                  value={part.hint || ""}
                  onChange={(e) =>
                    onChange(i, { ...part, hint: e.target.value })
                  }
                  className="flex-1"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onRemove(i)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      ))}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange(questionParts.length, {
              type: "blank",
              id: crypto.randomUUID(),
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Blank
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange(questionParts.length, { type: "text", value: "" })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Text
        </Button>
      </div>
    </div>
  );
}
