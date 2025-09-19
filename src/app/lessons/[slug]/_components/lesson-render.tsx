import HtmlWrapper from "@/components/lessons/html-wrapper";
import parse from "html-react-parser";

export function LessonRender({ data }: { data: string }) {
  return (
   <HtmlWrapper>
      {parse(data)}
    </HtmlWrapper>
  );
}
