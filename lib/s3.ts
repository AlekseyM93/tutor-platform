import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const bucket = process.env.S3_BUCKET;

export const s3 = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
  }
});

export async function uploadBuffer(params: {
  key: string;
  body: Buffer;
  contentType: string;
}) {
  if (!bucket) throw new Error('S3_BUCKET is not configured');

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: params.key,
      Body: params.body,
      ContentType: params.contentType
    })
  );

  return {
    bucket,
    key: params.key
  };
}
