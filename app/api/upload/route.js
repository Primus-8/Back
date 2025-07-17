export const config = {
  api: {
    bodyParser: false,
  },
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { uploadthingMiddleware } from "uploadthing/next/middleware";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(({ file }) => {
    console.log("File uploaded:", file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { POST } = uploadthingMiddleware({
  router: ourFileRouter,
});

export const POST = uploadthingMiddleware({
  router: ourFileRouter,
});

// CORS header add karo POST response me bhi:
export const POST = async (req) => {
  const res = await uploadthingMiddleware({
    router: ourFileRouter,
  }).POST(req);

  res.headers.set("Access-Control-Allow-Origin", "*");
  return res;
};
