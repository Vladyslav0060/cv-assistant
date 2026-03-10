import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from './create-user.dto';

export class EnrichedUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ nullable: true })
  firstName?: string | null;

  @ApiPropertyOptional({ nullable: true })
  lastName?: string | null;

  @ApiPropertyOptional({ nullable: true })
  avatarUrl?: string | null;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: string;

  @ApiPropertyOptional({ nullable: true })
  address?: string | null;

  @ApiPropertyOptional({ nullable: true })
  city?: string | null;

  @ApiPropertyOptional({ nullable: true })
  state?: string | null;

  @ApiPropertyOptional({ nullable: true })
  zip?: string | null;

  @ApiPropertyOptional({ nullable: true })
  country?: string | null;

  @ApiPropertyOptional({ nullable: true })
  linkedIn?: string | null;

  @ApiPropertyOptional({ nullable: true })
  phone?: string | null;

  @ApiPropertyOptional({ nullable: true })
  skills?: any;

  @ApiPropertyOptional({ nullable: true })
  experience?: any;

  @ApiPropertyOptional({ nullable: true })
  education?: any;

  @ApiPropertyOptional({ nullable: true })
  achievements?: any;

  @ApiPropertyOptional({ nullable: true })
  summary?: string | null;

  @ApiPropertyOptional({ nullable: true })
  portfolio?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}