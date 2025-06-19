// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Course, User } from '@/payload-types'
// import { RichTextEditor } from '@/components/RichTextEditor'
// import { ImageUpload } from '@/components/ImageUpload'
// import { createCourse, updateCourse } from '@/lib/data/course'
// import type { Media } from '@/payload-types'

// interface CourseFormProps {
//   user: User | null
//   initialData?: Course
// }

// type FormData = {
//   title: string
//   description: Course['description'] | null
//   price: Course['price']
//   thumbnail: Course['thumbnail'] | null
//   category: Course['category']
//   structureType: Course['structureType']
//   status: Course['status']
//   whatYouWillLearn: Course['whatYouWillLearn']
//   requirements: Course['requirements']
// }

// export function CourseForm({ user, initialData }: CourseFormProps) {
//   const router = useRouter()
//   const [isLoading, setIsLoading] = useState(false)

//   const [formData, setFormData] = useState<FormData>({
//     title: initialData?.title || '',
//     description: initialData?.description ?? null,
//     price: initialData?.price || 0,
//     thumbnail: initialData?.thumbnail ?? null,
//     category: initialData?.category || '',
//     structureType: initialData?.structureType || 'flat',
//     status: initialData?.status || 'draft',
//     whatYouWillLearn: initialData?.whatYouWillLearn || [{ learning: '' }],
//     requirements: initialData?.requirements || [{ requirement: '' }],
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!user) return

//     try {
//       setIsLoading(true)

//       if (!formData.description) {
//         throw new Error('Description is required')
//       }

//       if (!formData.thumbnail) {
//         throw new Error('Thumbnail is required')
//       }

//       const newCourse: Omit<Course, 'id' | 'updatedAt' | 'createdAt'> = {
//         title: formData.title,
//         description: formData.description,
//         price: formData.price,
//         thumbnail: formData.thumbnail,
//         category: formData.category,
//         structureType: formData.structureType,
//         status: formData.status,
//         producer: user.id,
//         slug: formData.title.toLowerCase().replace(/ /g, '-'),
//       }

//       let res: Course | null = null

//       if (initialData) {
//         res = await updateCourse(initialData.id, newCourse)
//       } else {
//         res = await createCourse(newCourse)
//       }

//       if (!res) {
//         throw new Error('Failed to save course')
//       }

//       router.push(`/producer/courses/${res.id}/edit`)
//       router.refresh()
//     } catch (error) {
//       console.error('Error saving course:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleArrayFieldAdd = (field: 'whatYouWillLearn' | 'requirements') => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: [
//         ...(prev[field] || []),
//         field === 'whatYouWillLearn' ? { learning: '' } : { requirement: '' },
//       ],
//     }))
//   }

//   const handleArrayFieldRemove = (field: 'whatYouWillLearn' | 'requirements', index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: prev[field]?.filter((_, i) => i !== index) || [],
//     }))
//   }

//   const handleArrayFieldChange = (
//     field: 'whatYouWillLearn' | 'requirements',
//     index: number,
//     value: string,
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]:
//         prev[field]?.map((item, i) =>
//           i === index
//             ? field === 'whatYouWillLearn'
//               ? { learning: value }
//               : { requirement: value }
//             : item,
//         ) || [],
//     }))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
//       <div className="space-y-8 divide-y divide-gray-200">
//         <div>
//           <div>
//             <h3 className="text-lg font-medium leading-6 text-gray-900">Course Information</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               This information will be displayed publicly on the course page.
//             </p>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//             <div className="sm:col-span-4">
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//                 Title
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="text"
//                   name="title"
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//                 Description
//               </label>
//               <div className="mt-1">
//                 <RichTextEditor
//                   value={formData.description}
//                   onChange={(value) => setFormData((prev) => ({ ...prev, description: value }))}
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-4">
//               <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//                 Price
//               </label>
//               <div className="mt-1">
//                 <input
//                   type="number"
//                   name="price"
//                   id="price"
//                   min="0"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       price: parseFloat(e.target.value),
//                     }))
//                   }
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 />
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//                 Category
//               </label>
//               <div className="mt-1">
//                 <select
//                   id="category"
//                   name="category"
//                   value={formData.category}
//                   onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 >
//                   <option value="">Select a category</option>
//                   <option value="Programming">Programming</option>
//                   <option value="Design">Design</option>
//                   <option value="Business">Business</option>
//                   <option value="Marketing">Marketing</option>
//                   <option value="Music">Music</option>
//                   <option value="Photography">Photography</option>
//                   <option value="Health & Fitness">Health & Fitness</option>
//                   <option value="Personal Development">Personal Development</option>
//                 </select>
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="structureType" className="block text-sm font-medium text-gray-700">
//                 Course Structure
//               </label>
//               <div className="mt-1">
//                 <select
//                   id="structureType"
//                   name="structureType"
//                   value={formData.structureType}
//                   onChange={(e) =>
//                     setFormData((prev) => ({
//                       ...prev,
//                       structureType: e.target.value as Course['structureType'],
//                     }))
//                   }
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 >
//                   <option value="flat">Flat</option>
//                   <option value="hierarchical">Hierarchical</option>
//                 </select>
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
//                 Course Thumbnail
//               </label>
//               <ImageUpload
//                 value={(formData.thumbnail as Media) ?? null}
//                 onChange={(value) =>
//                   setFormData((prev) => ({ ...prev, thumbnail: value ?? prev.thumbnail }))
//                 }
//               />
//             </div>

//             <div className="sm:col-span-6">
//               <label className="block text-sm font-medium text-gray-700">What You Will Learn</label>
//               <div className="mt-1 space-y-2">
//                 {formData.whatYouWillLearn?.map((item, index) => (
//                   <div key={index} className="flex gap-2">
//                     <input
//                       type="text"
//                       value={item.learning ?? ''}
//                       onChange={(e) =>
//                         handleArrayFieldChange('whatYouWillLearn', index, e.target.value)
//                       }
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleArrayFieldRemove('whatYouWillLearn', index)}
//                       className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => handleArrayFieldAdd('whatYouWillLearn')}
//                   className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Add Learning Outcome
//                 </button>
//               </div>
//             </div>

//             <div className="sm:col-span-6">
//               <label className="block text-sm font-medium text-gray-700">Requirements</label>
//               <div className="mt-1 space-y-2">
//                 {formData.requirements?.map((item, index) => (
//                   <div key={index} className="flex gap-2">
//                     <input
//                       type="text"
//                       value={item.requirement ?? ''}
//                       onChange={(e) =>
//                         handleArrayFieldChange('requirements', index, e.target.value)
//                       }
//                       className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => handleArrayFieldRemove('requirements', index)}
//                       className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => handleArrayFieldAdd('requirements')}
//                   className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//                 >
//                   Add Requirement
//                 </button>
//               </div>
//             </div>

//             <div className="sm:col-span-3">
//               <label htmlFor="status" className="block text-sm font-medium text-gray-700">
//                 Status
//               </label>
//               <div className="mt-1">
//                 <select
//                   id="status"
//                   name="status"
//                   value={formData.status}
//                   onChange={(e) =>
//                     setFormData((prev) => ({ ...prev, status: e.target.value as Course['status'] }))
//                   }
//                   className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                 >
//                   <option value="draft">Draft</option>
//                   <option value="published">Published</option>
//                   <option value="archived">Archived</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="pt-5">
//         <div className="flex justify-end">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Saving...' : initialData ? 'Update Course' : 'Create Course'}
//           </button>
//         </div>
//       </div>
//     </form>
//   )
// }
