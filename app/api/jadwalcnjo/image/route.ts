import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".bmp": "image/bmp",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedFile = searchParams.get("file");

    const dirPath = path.join(process.cwd(), "jadwalcnjo");

    if (!fs.existsSync(dirPath)) {
      return new NextResponse("Directory not found", { status: 404 });
    }

    let targetFilename = requestedFile;

    // If no file requested, find the latest image in the directory
    if (!targetFilename) {
      const allFiles = fs.readdirSync(dirPath);
      const imageFiles = allFiles.filter((f) =>
        [".jpg", ".jpeg", ".png", ".webp", ".bmp"].includes(
          path.extname(f).toLowerCase()
        )
      );

      if (imageFiles.length === 0) {
        return new NextResponse("No image found in jadwalcnjo directory", {
          status: 404,
        });
      }

      // Sort by mtime descending
      imageFiles.sort((a, b) => {
        const aTime = fs.statSync(path.join(dirPath, a)).mtimeMs;
        const bTime = fs.statSync(path.join(dirPath, b)).mtimeMs;
        return bTime - aTime;
      });

      targetFilename = imageFiles[0];
    }

    // Security check: prevent directory traversal
    const safeFilename = path.basename(targetFilename);
    const filePath = path.join(dirPath, safeFilename);

    if (!fs.existsSync(filePath)) {
      return new NextResponse("File not found", { status: 404 });
    }

    const ext = path.extname(safeFilename).toLowerCase();
    const contentType = MIME_MAP[ext] || "application/octet-stream";
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
        "Content-Disposition": `inline; filename="${safeFilename}"`,
      },
    });
  } catch (error) {
    console.error("Error serving jadwalcnjo image:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

