import z from 'zod'

const envVarSchema = z.object({
  apiUrl: z.string(),
  apiKey: z.string(),
  authDomain: z.string(),
  projectId: z.string(),
  storageBucket: z.string(),
  messagingSenderId: z.string(),
  appId: z.string(),
  measurementId: z.string(),
  cloudinary_upload_preset: z.string(),
  cloudinary_cloudname: z.string(),
})

export const envVars = envVarSchema.parse({
  apiUrl: process.env.NEXT_PUBLIC_apiUrl,
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
  cloudinary_upload_preset: process.env.NEXT_PUBLIC_cloudinary_upload_preset,
  cloudinary_cloudname: process.env.NEXT_PUBLIC_cloudinary_cloudname,
})
