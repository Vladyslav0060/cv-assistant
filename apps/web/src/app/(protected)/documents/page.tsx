"use client";

import { ROUTES } from "@/common/routes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { useGetDocumentsPreview } from "@/hooks/document/useGetDocumentsPreview";
import { useRouter } from "next/navigation";

export default function Documents() {
  const router = useRouter();
  const { data: documents } = useGetDocumentsPreview();
  console.log({ documents });
  return (
    <div>
      <h1>Documents</h1>
      <Container>
        <div className="mt-4">
          {documents?.map((document) => (
            <Card
              key={document.id}
              className="cursor-pointer"
              onClick={() => router.push(`${ROUTES.DOCUMENTS}/${document.id}`)}
            >
              <CardHeader>
                <CardTitle>{document.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-row w-full justify-between">
                    <p>{document.type}</p>
                    <p>{new Date(document.updatedAt).toLocaleDateString()}</p>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}
