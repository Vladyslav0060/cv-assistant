"use client";

import { ShadcnEditor } from "@/components/editor";
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs";
import { ROUTES } from "@/common/routes";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDocument } from "@/hooks/document/useGetDocument";
import { use } from "react";
import { Container } from "@/components/ui/container";

export const DocumentPage = ({
  params,
}: {
  params: Promise<{ documentId: string }>;
}) => {
  const { documentId } = use(params);
  const { data: document } = useGetDocument(documentId);
  console.log({ document });
  return (
    <div className="flex flex-col">
      <PageBreadcrumbs
        items={[
          { href: ROUTES.HOME, title: "Home" },
          { href: ROUTES.DOCUMENTS, title: "Documents" },
          {
            href: `${ROUTES.DOCUMENTS}/${documentId}`,
            title: document?.title ?? "Document",
          },
        ]}
      />
      <Container variant={"fullMobileConstrainedBreakpointPadded"}>
        <Card>
          <CardContent className="p-0">
            {document?.content}
            {/* {document === undefined ? (
              <div className="min-h-[600px] p-4 text-sm text-muted-foreground">
                Loading document...
              </div>
            ) : document ? (
              <ShadcnEditor initialMarkdown={document.content} />
            ) : (
              <div className="min-h-[600px] p-4 text-sm text-muted-foreground">
                Document could not be loaded.
              </div>
            )} */}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default DocumentPage;
