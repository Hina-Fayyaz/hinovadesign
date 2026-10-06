export function submitInquiry(payload: { type: string; data: Record<string, unknown>; audience?: string }): Promise<{ ok: true; id?: string }>;
