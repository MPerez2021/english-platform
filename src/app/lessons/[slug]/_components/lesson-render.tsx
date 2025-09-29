import HtmlWrapper from "@/components/lessons/html-wrapper";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

export function LessonRender({ html }: { html: string }) {
  const sanitizedContent = DOMPurify.sanitize(html);
  return (
   <HtmlWrapper>
      {parse(sanitizedContent)}
    </HtmlWrapper>
  );
}
