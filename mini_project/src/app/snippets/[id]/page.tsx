import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteSnippet } from "@/actions";

type SnippetDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function SnippetDetailsPage({
  params,
}: SnippetDetailsProps) {
  const { id: idStr } = await params;
  //Object destructuring with alias (property के बाद :) यहाँ : का मतलब type नहीं है। इसका मतलब है: object की property id को निकालकर नए variable idStr में रखो।

  const numID = Number(idStr);

  if (!numID || isNaN(numID)) {
    return <div>Invalid snippet id</div>;
  }

  const snippetData = await prisma.snippet.findUnique({
    where: { id: numID },
  });

  if (!snippetData) {
    return <div>Snippet not found</div>;
  }

  const deleteSnippetAction = deleteSnippet.bind(null, numID);

  return (
    <div className="flex items-start gap-6 bg-white shadow-md rounded-lg p-6">
      {/* Left Section */}
      <div className="flex-1">
        <h1 className="text-xl font-bold text-gray-800">
          ID: {snippetData.id}
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 mt-2">
          Title: {snippetData.title}
        </h2>
        <pre className="bg-gray-100 p-4 rounded-md mt-4 text-sm text-gray-700 overflow-x-auto">
          {snippetData.code}
        </pre>
      </div>

      {/* Right Section */}
      <div className="flex flex-col gap-3">
        <Link href={`/snippets/${numID}/edit`}>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-md px-4 py-2 shadow">
            Edit
          </Button>{" "}
        </Link>
        <form action={deleteSnippetAction}>
          <Button
            type="submit"
            className="bg-red-500 text-white hover:bg-red-600 rounded-md px-4 py-2 shadow"
          >
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
