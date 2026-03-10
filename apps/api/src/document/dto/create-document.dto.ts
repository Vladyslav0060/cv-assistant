import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { DocumentType } from 'generated/prisma/enums';

export class CreateDocumentDto {
  @ApiProperty({ required: true })
  @IsString()
  jobTitle: string;

  @ApiProperty({ required: true })
  @IsString()
  company: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsEnum(DocumentType)
  type: 'RESUME' | 'COVER_LETTER';

  @ApiProperty({ required: true })
  @IsString()
  content: string;
}
