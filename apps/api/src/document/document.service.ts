import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async getUserDocumentById(userId: string, documentId: string) {
    return this.prisma.document.findUnique({
      where: { id: documentId, AND: { userId } },
    });
  }

  async getUserDocuments(userId: string) {
    try {
      return this.prisma.document.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {}
  }

  async createDocument(userId: string, createDocumentDto: CreateDocumentDto) {
    try {
      const { content, type, jobTitle } = createDocumentDto;
      return this.prisma.document.create({
        data: {
          userId,
          content,
          title: jobTitle,
          type,
        },
      });
    } catch (error) {}
  }
}
