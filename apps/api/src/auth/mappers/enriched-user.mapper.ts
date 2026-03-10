import { EnrichedUser } from 'src/user/user.select';
import { EnrichedUserDto } from 'src/user/dto/enriched-user.dto';

export function toEnrichedUserDto(user: EnrichedUser): EnrichedUserDto {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    avatarUrl: user.avatarUrl ?? '',
    role: user.role,
    address: user.address ?? null,
    city: user.city ?? null,
    state: user.state ?? null,
    zip: user.zip ?? null,
    country: user.country ?? null,
    linkedIn: user.linkedIn ?? null,
    phone: user.phone ?? null,
    skills: user.skills ?? null,
    experience: user.experience ?? null,
    education: user.education ?? null,
    achievements: user.achievements ?? null,
    summary: user.summary ?? null,
    portfolio: user.portfolio ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
