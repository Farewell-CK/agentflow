type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ZhipuChatChoice = {
  message?: {
    content?: string;
  };
};

type ZhipuChatResponse = {
  choices?: ZhipuChatChoice[];
  error?: {
    code?: string;
    message?: string;
  };
};

const endpoint = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

export function hasZhipuConfig() {
  return Boolean(process.env.ZHIPU_API_KEY);
}

export async function callZhipuChat(messages: ChatMessage[]) {
  const apiKey = process.env.ZHIPU_API_KEY;
  if (!apiKey) {
    throw new Error("ZHIPU_API_KEY is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.ZHIPU_MODEL ?? "glm-5.2",
      messages,
      temperature: 0.35,
      thinking: {
        type: "enabled"
      },
      reasoning_effort: "medium"
    })
  });

  const data = (await response.json()) as ZhipuChatResponse;

  if (!response.ok || data.error) {
    throw new Error(data.error?.message ?? `Zhipu API request failed: ${response.status}`);
  }

  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Zhipu API returned an empty response");
  }

  return content;
}
