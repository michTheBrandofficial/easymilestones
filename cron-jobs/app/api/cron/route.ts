import { NextRequest, NextResponse } from "next/server";
import { http, createWalletClient } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { configDotenv } from "dotenv";
import contractAbi from "@/abi";

configDotenv({
  path: [".env", ".env.local"],
});

const processDueMilestones = async () => {
  try {
    const localAccount = privateKeyToAccount(
      process.env.DEPLOYER_PRIVATE_KEY! as `0x${string}`
    );

    const walletClient = createWalletClient({
      chain: baseSepolia,
      transport: http(process.env.RPC_URL),
      account: localAccount,
    });

    const DEPLOYED_CONTRACT_ADDRESS = process.env
      .CONTRACT_ADDRESS! as `0x${string}`;

    const hash = await walletClient.writeContract({
      address: DEPLOYED_CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: "processDueMilestones",
      args: [] as any,
    });

    console.log("Transaction hash:", hash);
    return hash;
  } catch (err) {
    console.error("Error processing due milestones:", err);
    throw err;
  }
};

export async function GET(request: NextRequest) {
  try {
    // verify request is from cron-job.org service
    const allowedOrigins = ["cron-job.org", "console.cron-job.org"];
    const origin = request.headers.get('origin');
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        { status: 403 }
      );
    }
    // verify authorization header
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const hash = await processDueMilestones();

    return NextResponse.json({
      success: true,
      hash,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support POST requests for manual triggering
export async function POST(request: NextRequest) {
  return GET(request);
}
