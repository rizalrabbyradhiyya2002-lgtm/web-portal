import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface JadwalCnjoFile {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
}

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "jadwalcnjo");

    if (!fs.existsSync(dirPath)) {
      return NextResponse.json({ files: [] });
    }

    const validExtensions = [".jpg", ".jpeg", ".png", ".webp", ".bmp"];
    const allFiles = fs.readdirSync(dirPath);

    const imageFiles = allFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return validExtensions.includes(ext);
    });

    const files: JadwalCnjoFile[] = imageFiles.map((filename) => {
      const fullPath = path.join(dirPath, filename);
      const stats = fs.statSync(fullPath);
      return {
        name: filename,
        url: `/api/jadwalcnjo/image?file=${encodeURIComponent(filename)}`,
        size: stats.size,
        updatedAt: stats.mtime.toISOString(),
      };
    });

    // Sort by latest modified
    files.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      files,
      latest: files[0] || null,
    });
  } catch (error) {
    console.error("Error reading jadwalcnjo directory:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Gagal membaca direktori jadwalcnjo",
        files: [],
      },
      { status: 500 }
    );
  }
}

