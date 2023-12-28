import { mkdir, writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const filesFolderPath = path.join(process.cwd(), 'public', 'files')

  await mkdir(filesFolderPath, { recursive: true })

  const filePath = path.join(filesFolderPath, file.name)
  await writeFile(filePath, buffer)
  const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath)

  return NextResponse.json({
    success: true,
    path: relativePath,
    size: (file.size / 10 ** 6).toFixed(2), // in MB
    type: file.type,
    name: file.name,
  })
}
