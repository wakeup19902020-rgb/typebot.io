import { z } from "zod";

export const subscriptionSchema = z.object({
  currentBillingPeriod: z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
  }),
  currency: z.enum(["eur", "usd"]),
  cancelDate: z.coerce.date().optional(),
  status: z.enum(["active", "past_due"]),
});

export type Subscription = z.infer<typeof subscriptionSchema>;
