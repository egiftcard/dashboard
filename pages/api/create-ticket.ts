import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

export const config = {
  runtime: "edge",
};

export interface CreateConversationRequest {
  markdown: string;
  status: "open" | "in_progress" | "on_hold" | "closed";
  triageChannelId: string;
  assignedToUserId?: string;
  customerId?: string;
  priority?: number;
  notes?: string;
}

const handler = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "invalid method" }, { status: 400 });
  }

  const requestBody = (await req.json()) as CreateConversationRequest;

  console.log({ requestBody });

  const { markdown = "test" } = requestBody;
  invariant(process.env.UNTHREAD_API_KEY, "missing UNTHREAD_API_KEY");

  const message = `
  # Tier: 
  ${markdown}
  `;

  try {
    const response = await fetch("https://api.unthread.io/api/conversations", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.UNTHREAD_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        markdown,
        status: "open",
        triageChannelId: "C05CE35U0A0",
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Error creating ticket", response },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { statusText: "Ticket created" },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating ticket", error },
      { status: 500 },
    );
  }
};

export default handler;
