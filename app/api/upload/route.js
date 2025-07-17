// app/api/upload/route.js

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { createNextRouteHandler } from "uploadthing/next";

const f = createUploadthing();

const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete: ", file.url);
    }),
};

// This exports the route handler functions GET and POST
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
