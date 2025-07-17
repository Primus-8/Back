import { utapi } from 'uploadthing/server';

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  if (!file) {
    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
      status: 400,
    });
  }

  const upload = await utapi.uploadFiles(file);
  return new Response(JSON.stringify({ url: upload.url }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
