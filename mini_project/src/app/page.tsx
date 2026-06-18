import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// export const dynamic = "force-dynamic"; //disable caching features dynamic routes
// export const revalidate = 0; // option 2 for disable caching features dynamic routes

export default async function Page() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Home</h1>
        <div className="flex items-center justify-between mt-4">
          <h2 className="text-xl font-semibold text-gray-700">My Snippets</h2>
          <Link href="/snippets/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              + New Snippet
            </Button>
          </Link>
        </div>
      </header>

      {/* Snippets List */}
      <section className="space-y-4">
        {snippets?.length > 0 ? (
          snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-sm text-gray-500">ID: {snippet.id}</p>
                <h3 className="text-lg font-medium text-gray-800">
                  {snippet.title}
                </h3>
              </div>
              <Link href={`/snippets/${snippet.id}`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  View
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No snippets found.</p>
        )}
      </section>
    </div>
  );
}
