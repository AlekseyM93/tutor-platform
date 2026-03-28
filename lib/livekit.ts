import { AccessToken } from 'livekit-server-sdk';

export function createLiveKitToken({
  room,
  identity,
  name
}: {
  room: string;
  identity: string;
  name: string;
}) {
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('LIVEKIT_API_KEY/LIVEKIT_API_SECRET are not configured');
  }

  const token = new AccessToken(apiKey, apiSecret, {
    identity,
    name,
    ttl: '2h'
  });

  token.addGrant({
    room,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true
  });

  return token.toJwt();
}
