import { Plan, WorkspaceRole } from "@typebot.io/prisma/enum";
import type { Prisma } from "@typebot.io/prisma/types";
import { z } from "zod";

export const workspaceMemberSchema = z.object({
  workspaceId: z.string(),
  userId: z.string(),
  user: z.object({
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
  }),
  role: z.nativeEnum(WorkspaceRole),
}) satisfies z.ZodType<
  Omit<Prisma.MemberInWorkspace, "createdAt" | "updatedAt"> & {
    user: Pick<Prisma.User, "name" | "email" | "image">;
  }
>;

export const workspaceInvitationSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  email: z.string(),
  type: z.nativeEnum(WorkspaceRole),
}) satisfies z.ZodType<
  Omit<Prisma.WorkspaceInvitation, "workspaceId" | "userId">
>;

const workspaceSettingsSchema = z.object({});

export const workspaceSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  icon: z.string().nullable(),
  plan: z.nativeEnum(Plan),
  stripeId: z.string().nullable(),
  additionalChatsIndex: z.number(),
  additionalStorageIndex: z.number(),
  chatsLimitFirstEmailSentAt: z.coerce.date().nullable(),
  chatsLimitSecondEmailSentAt: z.coerce.date().nullable(),
  storageLimitFirstEmailSentAt: z.coerce.date().nullable(),
  storageLimitSecondEmailSentAt: z.coerce.date().nullable(),
  settings: workspaceSettingsSchema.nullable(),
  customChatsLimit: z.number().nullable(),
  customStorageLimit: z.number().nullable(),
  customSeatsLimit: z.number().nullable(),
  isQuarantined: z.boolean(),
  isSuspended: z.boolean(),
  isPastDue: z.boolean(),
  isVerified: z.boolean().nullable(),
  chatsHardLimit: z.number().nullable(),
  lastActivityAt: z.coerce.date().nullable(),
  inactiveFirstEmailSentAt: z.coerce.date().nullable(),
  inactiveSecondEmailSentAt: z.coerce.date().nullable(),
}) satisfies z.ZodType<Prisma.Workspace>;

export type Workspace = z.infer<typeof workspaceSchema>;
export type WorkspaceMember = z.infer<typeof workspaceMemberSchema>;
export type WorkspaceInvitation = z.infer<typeof workspaceInvitationSchema>;
