import React from "react";
import HtmlWrapper from "@/components/lessons/HtmlWrapper";
import parse, {
  Element,
  domToReact,
  DOMNode,
  attributesToProps,
} from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";

export function LessonRender({ html }: { html: string }) {
  const sanitizedContent = DOMPurify.sanitize(html);
  let headingIndex = 0;

  const options = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        ["h1", "h2", "h3", "h4", "h5"].includes(domNode.name)
      ) {
        const id = `heading-${headingIndex++}`;
        const props = attributesToProps(domNode.attribs);

        return React.createElement(
          domNode.name,
          { ...props, id },
          domToReact(domNode.children as DOMNode[], options)
        );
      }
    },
  };

  return <HtmlWrapper>{parse(sanitizedContent, options)}</HtmlWrapper>;
}
