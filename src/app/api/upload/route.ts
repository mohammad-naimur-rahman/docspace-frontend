import { fileTypesArr } from '@/constants/file-data-type'
import { mkdir, unlink, writeFile } from 'fs/promises'
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

  if (!file.name) {
    return NextResponse.json({ success: false, message: 'File name is required!' })
  }

  if (!fileTypesArr.includes(file.name?.split('.').slice(-1)[0])) {
    return NextResponse.json({ success: false, message: 'Unsupported file format!' })
  }

  if (file.size > 10 * 2 ** 20) {
    return NextResponse.json({ success: false, message: 'File size too big!' })
  }

  const filePath = path.join(filesFolderPath, file.name)
  await writeFile(filePath, buffer)
  const relativePath = path.relative(path.join(process.cwd(), 'public'), filePath)

  return NextResponse.json({
    success: true,
    path: relativePath,
    size: (file.size / 2 ** 20).toFixed(2), // in MB
    type: file.type,
    name: file.name,
  })
}

export async function DELETE(request: NextRequest) {
  // Get the file path from the request body
  const data = await request.json()
  const filePath = data.path

  // Join the current working directory with the public/files directory and the file name
  const absolutePath = path.join(process.cwd(), 'public', filePath)

  // Delete the file asynchronously using the absolute path
  await unlink(absolutePath)

  // Return a success response
  return NextResponse.json({
    success: true,
    message: 'File deleted!',
  })
}
