// utils/zeroGHelper.ts

import { createZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";
import OpenAI from "openai";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

export async function query0G(prompt: string): Promise<string> {
  const privateKey = process.env.ZERO_G_PRIVATE_KEY!;
  const provider = new ethers.providers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");
  const wallet = new ethers.Wallet(privateKey, provider);

  const broker = await createZGComputeNetworkBroker(wallet);

  const selectedProvider = "0xf07240Efa67755B5311bc75784a061eDB47165Dd"; // llama-3.3-70b-instruct

  await broker.inference.acknowledgeProviderSigner(selectedProvider).catch((e) => {
    if (!e.message.includes("already acknowledged")) throw e;
  });

  const { endpoint, model } = await broker.inference.getServiceMetadata(selectedProvider);
  const headers = await broker.inference.getRequestHeaders(selectedProvider, prompt);

  const openai = new OpenAI({ baseURL: endpoint, apiKey: "" });

  const completion = await openai.chat.completions.create(
    {
      model,
      messages: [{ role: "user", content: prompt }],
    },
    { headers: headers as any }
  );

  return completion.choices[0].message.content ?? "No response";
}
