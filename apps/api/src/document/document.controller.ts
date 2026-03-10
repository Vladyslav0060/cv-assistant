import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { DocumentService } from './document.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UserService } from 'src/user/user.service';
import { buildApplicantInfo } from 'src/ai/utils';
import { AiService } from 'src/ai/ai.service';

@Controller('document')
export class DocumentController {
  constructor(
    private documentService: DocumentService,
    private userService: UserService,
    private aiService: AiService,
  ) {}
  @Get()
  async getUserDocuments(@Session() session: any) {
    console.log('session', session.passport.user);
    return this.documentService.getUserDocuments(session.passport.user);
  }

  @Post('/generate')
  @ApiBody({
    type: CreateDocumentDto,
  })
  async createDocument(
    @Session() session: any,
    @Body() body: CreateDocumentDto,
  ) {
    const { company, description, jobTitle, type } = body;
    const userId = session.passport.user;
    const user = await this.userService.getEnrichedUser(userId);
    const applicantInfo = buildApplicantInfo(user);

    const systemPrompt = `You are an expert career coach. Write a professional ${
      type
    } using the applicant's details and tailoring it to the job description. Keep formatting clean and professional.`;

    const userPrompt = `
${applicantInfo}

Job Posting:
Title: ${jobTitle}
Company: ${company}
Description: ${description}
`;
    const response = await this.aiService.ask(userPrompt, {
      system: systemPrompt,
    });
    return this.documentService.createDocument(session.passport.user, {
      ...body,
      content: response.text,
    });
  }
}
