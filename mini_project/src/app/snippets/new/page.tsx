import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CreatePageSnippets() {
  const createSnippetsHandler = async (formData: FormData) => {
    "use server"; // use server directive
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const snippet = await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });
    console.log("snippet is ", snippet);
    redirect("/");
  };

  return (
    <form action={createSnippetsHandler}>
      <div className="m-2">
        <Label className="m-2" htmlFor="">
          Title :{" "}
        </Label>
        <Input type="text" name="title" className="w-[50%]" />
      </div>
      <div className="m-2">
        <Label className="m-2" htmlFor="">
          Code :{" "}
        </Label>
        <Textarea className="w-[50%]" name="code" />
      </div>
      <Button type="submit">New</Button>{" "}
    </form>
  );
}
