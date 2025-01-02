const APP_ID = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "";
const APP_SECRET = process.env.FACEBOOK_APP_SECRET || "";

/**
 * Fetches the expiration time and validity of a Facebook access token.
 * @param userAccessToken - The user's access token to inspect.
 * @returns The expiration date and validity status.
 */
export async function getFacebookTokenExpiry(userAccessToken: string) {
  const appAccessToken = `${APP_ID}|${APP_SECRET}`;
  const url = `https://graph.facebook.com/debug_token?input_token=${userAccessToken}&access_token=${appAccessToken}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to inspect token: ${response.statusText}`);
  }

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }

  return {
    expiresAt: new Date(data.data.expires_at * 1000),
    isValid: data.data.is_valid,
  };
}
