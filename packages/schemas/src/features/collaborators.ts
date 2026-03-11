import { CollaborationType } from "@typebot.io/prisma/enum";
import type { Prisma } from "@typebot.io/prisma/types";
import { z } from "zod";

export const collaboratorSchema = z.object({
  type: z.nativeEnum(CollaborationType),
  userId: z.string(),
  typebotId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}) satisfies z.ZodType<Prisma.CollaboratorsOnTypebots>;
