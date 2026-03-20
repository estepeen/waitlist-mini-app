import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { parseSiweMessage } from "viem/siwe";

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export async function POST(request: NextRequest) {
  try {
    const { message, signature } = await request.json();

    if (!message || !signature) {
      return NextResponse.json(
        { message: "Missing message or signature" },
        { status: 400 }
      );
    }

    const valid = await publicClient.verifySiweMessage({
      message,
      signature,
    });

    if (!valid) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    const parsed = parseSiweMessage(message);
    const address = parsed.address;

    return NextResponse.json({ address });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 500 });
    }
    throw e;
  }
}
