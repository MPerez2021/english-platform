import React from "react";

export default function HtmlWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="max-w-full prose
  prose-headings:text-foreground
  prose-p:text-foreground
  prose-a:underline prose-a:text-primary
  prose-strong:text-foreground prose-strong:font-bold
  [&_a_strong]:text-primary
  dark:prose-invert"
    >
      {children}
    </div>
  );
}
