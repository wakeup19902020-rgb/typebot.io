import type { Prisma } from "@typebot.io/prisma/types";
import { z } from "zod";

export const folderSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  parentFolderId: z.string().nullable(),
  workspaceId: z.string(),
}) satisfies z.ZodType<Prisma.DashboardFolder>;

export type Folder = z.infer<typeof folderSchema>;
