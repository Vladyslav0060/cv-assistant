"use client";

import {
  ShadcnTemplate,
  ShadcnTemplateRef,
} from "@/components/editor/ShadcnTemplate";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDocument } from "@/hooks/document/useGetDocument";
import { use, useEffect, useRef } from "react";

export const DocumentPage = ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const { documentId } = use(params);
  const ref = useRef<ShadcnTemplateRef>(null);
  const { data: document } = useGetDocument(documentId);
  useEffect(() => {
    if (!document) return;
    ref.current?.injectMarkdown(document.content);
  }, [document]);
  return (
    <div className="flex flex-col">
      <p>Document {document?.id}</p>
      <Card>
        <CardContent className="p-0">
          <ShadcnTemplate ref={ref} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentPage;
