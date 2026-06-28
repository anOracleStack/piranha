import { z } from "zod";

const SubscribeSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export async function POST(request: Request) {
  try {
    const parsed = SubscribeSchema.safeParse(await request.json());
    if (!parsed.success) {
      return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid request." }, { status: 400 });
    }

    console.info(`[Vault Request] ${parsed.data.email} at ${new Date().toISOString()}`);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[Vault Subscribe]", error);
    return Response.json({ error: "Request failed." }, { status: 500 });
  }
}
