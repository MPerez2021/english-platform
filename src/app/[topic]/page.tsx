import type { Metadata } from "next";
interface PageProps {
  params: Promise<{ topic: string }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic } = await params

  if (!topic) {
    return {
      title: "Topic Not Found",
      description: "The requested topic could not be found.",
    }
  }

  return {
    title: `${topic}`,
    description: `${topic}`,
    keywords: [
      "English learning",
      topic,
      "English exercises",
      "free English learning",
    ],
    openGraph: {
      title: `${topic}`,
      description: topic,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${topic}`,
      description: topic,
    },
  }
}


export default async function Page() {
  return (
    <>
      Overview
    </>
  );
}