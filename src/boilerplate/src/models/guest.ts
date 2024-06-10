import { Role, SanitizeRole } from '@/types/Guest';

export const RoleEditOptions = [
  {
    value: Role.ADMINISTRATOR,
    label: SanitizeRole.ADMINISTRATOR,
  },
  {
    value: Role.COORDINATOR,
    label: SanitizeRole.COORDINATOR,
  },
  {
    value: Role.COMMON,
    label: SanitizeRole.COMMON,
  },
  {
    value: Role.GUEST,
    label: SanitizeRole.GUEST,
  },
];

export const RoleAdminOptions = [
  {
    value: Role.ADMINISTRATOR,
    label: SanitizeRole.ADMINISTRATOR,
  },
  {
    value: Role.COORDINATOR,
    label: SanitizeRole.COORDINATOR,
  },
  {
    value: Role.COMMON,
    label: SanitizeRole.COMMON,
  },
];

export const RoleCoordinatorOptions = [
  {
    value: Role.COORDINATOR,
    label: SanitizeRole.COORDINATOR,
  },
  {
    value: Role.COMMON,
    label: SanitizeRole.COMMON,
  },
];

export const RoleCommonOptions = [
  {
    value: Role.COMMON,
    label: SanitizeRole.COMMON,
  },
];

export const formatStatusAccept = (accepted: boolean | null) => {
  if (accepted === null) {
    return 'pending';
  }
  if (accepted) {
    return 'approved';
  }
  return 'rejected';
};
