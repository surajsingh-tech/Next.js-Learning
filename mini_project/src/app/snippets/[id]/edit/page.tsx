import EditSnippetForm from "@/components/EditSnippetForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";
type SnippetDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPageSnippet({ params }: SnippetDetailsProps) {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });
  if (!snippet) {
    return notFound();
  }

  return (
    <div>
      <EditSnippetForm snippet={snippet}/>
    </div>
  );
}
