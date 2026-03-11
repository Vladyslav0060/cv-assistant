"use client";

import { useGetDocument } from "@/hooks/document/useGetDocument";
import { use } from "react";

export const DocumentPage = ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const { documentId } = use(params);
  const { data: document } = useGetDocument(documentId);
  return (
    <div className="flex flex-col">
      <p>Document {document?.id}</p>
    </div>
  );
};

export default DocumentPage;
