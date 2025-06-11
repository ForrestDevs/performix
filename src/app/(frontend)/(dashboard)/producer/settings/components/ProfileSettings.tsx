// 'use client'

// import { useState } from 'react'
// import { Media, User } from '@/payload-types'
// import { ImageUpload } from '@/components/ImageUpload'

// interface ProfileSettingsProps {
//   user: User
// }

// type FormData = {
//   name: User['name']
//   email: User['email']
// }

// export function ProfileSettings({ user }: ProfileSettingsProps) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState<FormData>({
//     name: user.name || '',
//     email: user.email,
//   })

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       setIsLoading(true)

//       const res = await fetch(`/api/users/${user.id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       if (!res.ok) {
//         throw new Error('Failed to update profile')
//       }

//       // Refresh the page to show updated data
//       window.location.reload()
//     } catch (error) {
//       console.error('Error updating profile:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
//       <div className="p-6">
//         <h3 className="text-base font-semibold leading-6 text-gray-900">Profile Information</h3>
//         <p className="mt-1 text-sm text-gray-500">
//           Update your profile information and social media links.
//         </p>

//         <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
//           <div className="sm:col-span-6">
//             <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
//               Profile Photo
//             </label>
//             <div className="mt-1">
//               <ImageUpload
//                 value={formData.avatar ?? null}
//                 onChange={(value) => setFormData((prev) => ({ ...prev, avatar: value }))}
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-3">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//               Name
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-3">
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <div className="mt-1">
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={formData.email}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-6">
//             <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//               Bio
//             </label>
//             <div className="mt-1">
//               <textarea
//                 id="bio"
//                 name="bio"
//                 rows={3}
//                 value={formData.bio || ''}
//                 onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//             <p className="mt-2 text-sm text-gray-500">
//               Write a few sentences about yourself and your teaching experience.
//             </p>
//           </div>

//           <div className="sm:col-span-3">
//             <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
//               Twitter
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="twitter"
//                 id="twitter"
//                 value={formData.socialLinks?.find((link) => link.platform === 'twitter')?.url || ''}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     socialLinks: prev.socialLinks?.map((link) =>
//                       link.platform === 'twitter' ? { ...link, url: e.target.value } : link,
//                     ),
//                   }))
//                 }
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-3">
//             <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
//               LinkedIn
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="linkedin"
//                 id="linkedin"
//                 value={
//                   formData.socialLinks?.find((link) => link.platform === 'linkedin')?.url || ''
//                 }
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     socialLinks: prev.socialLinks?.map((link) =>
//                       link.platform === 'linkedin' ? { ...link, url: e.target.value } : link,
//                     ),
//                   }))
//                 }
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div className="sm:col-span-3">
//             <label htmlFor="github" className="block text-sm font-medium text-gray-700">
//               GitHub
//             </label>
//             <div className="mt-1">
//               <input
//                 type="text"
//                 name="github"
//                 id="github"
//                 value={formData.socialLinks?.find((link) => link.platform === 'github')?.url || ''}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     socialLinks: prev.socialLinks?.map((link) =>
//                       link.platform === 'github' ? { ...link, url: e.target.value } : link,
//                     ),
//                   }))
//                 }
//                 className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
//         >
//           {isLoading ? 'Saving...' : 'Save Changes'}
//         </button>
//       </div>
//     </form>
//   )
// }
