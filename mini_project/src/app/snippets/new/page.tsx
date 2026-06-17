"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as actions from "@/actions";
import { useActionState } from "react";

export default function CreatePageSnippets() {
  const [state, actionFun] = useActionState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={actionFun}>
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
      {state.message && (
        <div className="p-2 bg-red-600 border-2 my-4 text-white font-bold">{state.message}</div>
      )}
      <Button type="submit">New</Button>{" "}
    </form>
  );
}
