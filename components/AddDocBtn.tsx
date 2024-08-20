"use client";

import { createDocument } from "@/lib/actions/room.actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddDocBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const addDocument = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button
      type="submit"
      onClick={addDocument}
      className="gradient-blue flex gap-1 shadow-md"
    >
      <Image src="/assets/icons/add.svg" alt="add" width={24} height={24} />
      <p className="hidden sm:block">Start a blank document</p>
    </Button>
  );
};

export default AddDocBtn;
