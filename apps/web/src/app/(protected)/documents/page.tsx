"use client";

import { ROUTES } from "@/common/routes";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { useGetDocumentsPreview } from "@/hooks/document/useGetDocumentsPreview";
import { useRouter } from "next/navigation";

export default function Documents() {
  const router = useRouter();
  const { data: documents } = useGetDocumentsPreview();
  console.log({ documents });
  return (
    <div>
      <PageBreadcrumbs
        items={[
          { href: ROUTES.HOME, title: "Home" },
          { href: ROUTES.DOCUMENTS, title: "Documents" },
        ]}
      />
      <Container variant={"fullMobileConstrainedBreakpointPadded"}>
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
      </Container>
    </div>
  );
}
