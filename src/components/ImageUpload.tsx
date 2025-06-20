// 'use client'

// import { useState } from 'react'
// import { useDropzone } from 'react-dropzone'
// import { createMedia } from '@/lib/data/course'
// import type { Media } from '@/payload-types'
// import { Media as MediaComponent } from '@/components/Media'

// interface ImageUploadProps {
//   value: Media | null
//   onChange: (value: Media | null) => void
// }

// export function ImageUpload({ value, onChange }: ImageUploadProps) {
//   const [isUploading, setIsUploading] = useState(false)

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
//     },
//     maxFiles: 1,
//     onDrop: async (acceptedFiles: File[]) => {
//       if (!acceptedFiles.length) return

//       try {
//         setIsUploading(true)
//         const file = acceptedFiles[0]
//         const formData = new FormData()
//         if (!file) {
//           throw new Error('No file selected')
//         }

//         formData.append('file', file)

//         const doc = await createMedia(file)

//         if (!doc) {
//           throw new Error('Failed to upload image')
//         }

//         onChange(doc)
//       } catch (error) {
//         console.error('Error uploading image:', error)
//       } finally {
//         setIsUploading(false)
//       }
//     },
//   })

//   return (
//     <div>
//       {value ? (
//         <div className="relative">
//           <MediaComponent resource={value} imgClassName="rounded-lg object-cover" />
//           <button
//             type="button"
//             onClick={() => onChange(null)}
//             className="absolute top-2 right-2 rounded-full bg-gray-900 bg-opacity-50 p-1 text-white hover:bg-opacity-75"
//           >
//             <svg
//               className="h-5 w-5"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 20 20"
//               fill="currentColor"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>
//       ) : (
//         <div
//           {...getRootProps()}
//           className={`flex justify-center rounded-lg border-2 border-dashed px-6 py-10 ${
//             isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
//           }`}
//         >
//           <div className="text-center">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               xmlns="http://www.w3.org/2000/svg"
//               stroke="currentColor"
//               fill="none"
//               viewBox="0 0 48 48"
//               aria-hidden="true"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//               />
//             </svg>
//             <div className="mt-4 flex text-sm text-gray-600">
//               <input {...getInputProps()} />
//               <p className="pl-1">
//                 {isUploading ? 'Uploading...' : 'Drag and drop an image, or click to select'}
//               </p>
//             </div>
//             <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
