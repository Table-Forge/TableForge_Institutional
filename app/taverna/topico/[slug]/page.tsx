import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { initialTavernaTopics, initialTavernaReplies } from "@/data/taverna.mock";
import { TopicThreadView } from "@/components/taverna/topic-thread-view";

interface ITopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ITopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = initialTavernaTopics.find((t) => t.slug === slug);

  if (!topic) {
    return { title: "Discussão Não Encontrada | A Taverna TableForge" };
  }

  return {
    title: `${topic.title} | A Taverna TableForge`,
    description: topic.content.slice(0, 160),
    openGraph: {
      title: topic.title,
      description: topic.content.slice(0, 160),
      type: "article",
    },
  };
}

export default async function TopicPage({ params }: ITopicPageProps) {
  const { slug } = await params;
  const topic = initialTavernaTopics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  const replies = initialTavernaReplies[topic.id] || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: topic.title,
    articleBody: topic.content,
    datePublished: topic.createdAtUtc,
    author: {
      "@type": "Person",
      name: topic.author.nickname,
    },
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CommentAction",
        userInteractionCount: topic.replyCount,
      },
      {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/LikeAction",
        userInteractionCount: topic.upvoteCount,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <TopicThreadView topic={topic} initialReplies={replies} />
    </>
  );
}
