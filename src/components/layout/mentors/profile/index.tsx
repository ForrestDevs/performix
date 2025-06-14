export { MentorProvider, useMentor, type MentorData } from './mentor-context'
export { MentorHero } from './mentor-hero'
export { MentorNavigation } from './mentor-navigation'
export { MentorAbout } from './mentor-about'
export { MentorBookingModal } from './mentor-booking-modal'
export { MentorProfileClient } from './mentor-profile-client'
export { MentorLocationCard } from './mentor-location-card'
export { MentorContactCard } from './mentor-contact-card'
export { useScrollAnimation } from '../hooks/use-scroll-animation'
export { getMentorData } from '../data/get-mentor-data'

// function MentorProfilePageTEST() {
//   const visibleElements = useScrollAnimation()
//   const [activeTab, setActiveTab] = useState('about')
//   const [isBookingOpen, setIsBookingOpen] = useState(false)
//   const [selectedDate, setSelectedDate] = useState<string | null>(null)
//   const [selectedTime, setSelectedTime] = useState<string | null>(null)
//   const [selectedSessionType, setSelectedSessionType] = useState(mentorData.sessionTypes[0])
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)
//   const [activeGalleryItem, setActiveGalleryItem] = useState<number | null>(null)
//   const [galleryFilter, setGalleryFilter] = useState('All')

//   const isVisible = (id: string) => visibleElements.has(id)
//   const sectionRefs = {
//     about: useRef<HTMLDivElement>(null),
//     experience: useRef<HTMLDivElement>(null),
//     gallery: useRef<HTMLDivElement>(null),
//     reviews: useRef<HTMLDivElement>(null),
//     availability: useRef<HTMLDivElement>(null),
//   }

//   // Handle scroll to section
//   const scrollToSection = (section: string) => {
//     setActiveTab(section)
//     sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({
//       behavior: 'smooth',
//       block: 'start',
//     })
//   }

//   // Handle booking
//   const handleBookSession = () => {
//     if (!selectedDate || !selectedTime) return

//     setIsLoading(true)
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//       setIsBookingOpen(false)
//       alert('Session booked successfully!')
//     }, 1500)
//   }

//   // Filter gallery items
//   const filteredGalleryItems =
//     galleryFilter === 'All'
//       ? mentorData.gallery
//       : mentorData.gallery.filter((item) => item.category === galleryFilter)

//   // Get unique gallery categories
//   const galleryCategories = [
//     'All',
//     ...Array.from(new Set(mentorData.gallery.map((item) => item.category))),
//   ]

//   // Get available dates (next 14 days)
//   const getAvailableDates = () => {
//     const dates: Date[] = []
//     const today = new Date()
//     for (let i = 0; i < 14; i++) {
//       const date = new Date(today)
//       date.setDate(today.getDate() + i)
//       dates.push(date)
//     }
//     return dates
//   }

//   // Format date for display
//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
//   }

//   // Get day of week from date
//   const getDayOfWeek = (date: Date) => {
//     return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
//   }

//   // Check if date has availability
//   const hasAvailability = (date: Date) => {
//     const day = getDayOfWeek(date)
//     return mentorData.availability[day as keyof typeof mentorData.availability]?.length > 0
//   }

//   // Get available times for selected date
//   const getAvailableTimes = () => {
//     if (!selectedDate) return []
//     const date = new Date(selectedDate)
//     const day = getDayOfWeek(date)
//     return mentorData.availability[day as keyof typeof mentorData.availability] || []
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       {/* <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-16">
//               <div className="flex items-center space-x-4">
//                 <Link href="/">
//                   <PerformixLogo />
//                 </Link>
//                 <ChevronRight className="h-4 w-4 text-gray-400" />
//                 <Link href="/mentors" className="text-gray-600 hover:text-[#0891B2] transition-colors">
//                   Mentors
//                 </Link>
//                 <ChevronRight className="h-4 w-4 text-gray-400" />
//                 <span className="text-gray-600">{mentorData.name}</span>
//               </div>
//               <nav className="hidden md:flex items-center space-x-8">
//                 <Link href="/" className="text-gray-600 hover:text-[#0891B2] transition-colors">
//                   Home
//                 </Link>
//                 <Link href="/mentors" className="text-gray-600 hover:text-[#0891B2] transition-colors">
//                   Browse Mentors
//                 </Link>
//                 <Link href="/testimonials" className="text-gray-600 hover:text-[#0891B2] transition-colors">
//                   Success Stories
//                 </Link>
//                 <Button variant="outline" className="border-[#0891B2] text-[#0891B2] hover:bg-[#0891B2] hover:text-white">
//                   Sign In
//                 </Button>
//                 <Button className="bg-[#0891B2] hover:bg-[#0E7490] text-white">Get Started</Button>
//               </nav>
//             </div>
//           </div>
//         </header> */}

//       {/* Hero Section */}
//       <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
//         {/* Hero Image with Parallax Effect */}
//         <motion.div
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.8, ease: 'easeOut' }}
//           className="absolute inset-0 z-0"
//         >
//           <Image
//             src={mentorData.heroImage || '/placeholder.svg'}
//             alt={`${mentorData.name} in action`}
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
//         </motion.div>

//         {/* Hero Content */}
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex flex-col justify-end pb-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <Badge className="bg-[#0891B2] text-white mb-4">Elite Mentor</Badge>
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk']">
//               {mentorData.name}
//             </h1>
//             <p className="text-xl text-white/90 max-w-2xl mb-6">{mentorData.shortBio}</p>

//             {/* Quick Stats Banner */}
//             <div className="flex flex-wrap gap-6 mb-8">
//               <div className="flex items-center space-x-2 text-white/90">
//                 <Users className="h-5 w-5 text-[#0891B2]" />
//                 <span>{mentorData.currentTeam}</span>
//               </div>
//               <div className="flex items-center space-x-2 text-white/90">
//                 <Award className="h-5 w-5 text-[#0891B2]" />
//                 <span>{mentorData.position}</span>
//               </div>
//               <div className="flex items-center space-x-2 text-white/90">
//                 <MapPin className="h-5 w-5 text-[#0891B2]" />
//                 <span>
//                   {mentorData.location.city}, {mentorData.location.state}
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2 text-white/90">
//                 <Star className="h-5 w-5 text-yellow-400 fill-current" />
//                 <span>
//                   {mentorData.reviews.reduce((acc, review) => acc + review.rating, 0) /
//                     mentorData.reviews.length}{' '}
//                   ({mentorData.reviews.length} reviews)
//                 </span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-wrap gap-4">
//               <Button
//                 size="lg"
//                 className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
//                 onClick={() => setIsBookingOpen(true)}
//               >
//                 Book a Session
//                 <Calendar className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-[#0891B2]"
//                 onClick={() => setIsFavorite(!isFavorite)}
//               >
//                 {isFavorite ? (
//                   <>
//                     <Heart className="mr-2 h-5 w-5 fill-current text-red-500" />
//                     Saved
//                   </>
//                 ) : (
//                   <>
//                     <Heart className="mr-2 h-5 w-5" />
//                     Save
//                   </>
//                 )}
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-[#0891B2]"
//               >
//                 <Share2 className="mr-2 h-5 w-5" />
//                 Share
//               </Button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Social Media Links */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           className="absolute top-8 right-8 flex space-x-3"
//         >
//           <Link
//             href={`https://instagram.com/${mentorData.socialMedia.instagram}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
//           >
//             <Instagram className="h-5 w-5" />
//           </Link>
//           <Link
//             href={`https://tiktok.com/@${mentorData.socialMedia.tiktok}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
//           >
//             <TikTokIcon />
//           </Link>
//           <Link
//             href={`https://youtube.com/@${mentorData.socialMedia.youtube}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
//           >
//             <Youtube className="h-5 w-5" />
//           </Link>
//           <Link
//             href={`https://eliteprospects.com/player/${mentorData.socialMedia.eliteProspects}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0891B2] transition-colors duration-300"
//           >
//             <EliteProspectsIcon />
//           </Link>
//         </motion.div>
//       </section>

//       {/* Profile Navigation */}
//       <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex overflow-x-auto scrollbar-hide">
//             <div className="flex space-x-1 py-4">
//               {Object.keys(sectionRefs).map((section) => (
//                 <button
//                   key={section}
//                   onClick={() => scrollToSection(section)}
//                   className={`px-4 py-2 whitespace-nowrap font-medium rounded-md transition-colors duration-200 ${
//                     activeTab === section
//                       ? 'text-[#0891B2] bg-[#0891B2]/10'
//                       : 'text-gray-600 hover:text-[#0891B2] hover:bg-gray-100'
//                   }`}
//                 >
//                   {section.charAt(0).toUpperCase() + section.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-16">
//             {/* About Section */}
//             <section ref={sectionRefs.about} id="about-section" className="scroll-mt-32">
//               <div
//                 id="about-header"
//                 data-scroll-animate
//                 className={`mb-8 transition-all duration-1000 ${
//                   isVisible('about-header')
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-8'
//                 }`}
//               >
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
//                   About Jake
//                 </h2>
//                 <div className="prose max-w-none text-gray-700">
//                   <p className="text-lg leading-relaxed">{mentorData.bio}</p>
//                 </div>
//               </div>

//               {/* Skills Grid */}
//               <div
//                 id="skills-grid"
//                 data-scroll-animate
//                 className={`mt-12 transition-all duration-1000 ${
//                   isVisible('skills-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//                 }`}
//               >
//                 <h3 className="text-xl font-bold text-gray-900 mb-6">Expertise & Skills</h3>
//                 <div className="grid md:grid-cols-2 gap-6">
//                   {mentorData.skills.map((skill, index) => (
//                     <div
//                       key={skill.name}
//                       className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-300"
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       <div className="flex justify-between items-center mb-2">
//                         <h4 className="font-medium text-gray-900">{skill.name}</h4>
//                         <span className="text-[#0891B2] font-bold">{skill.level}%</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//                         <motion.div
//                           initial={{ width: 0 }}
//                           animate={{ width: `${skill.level}%` }}
//                           transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
//                           className="h-2.5 rounded-full bg-gradient-to-r from-[#0891B2] to-[#8B5CF6]"
//                         ></motion.div>
//                       </div>
//                       <p className="text-sm text-gray-600">{skill.description}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Ages & Sports */}
//               <div className="grid md:grid-cols-2 gap-8 mt-12">
//                 <div
//                   id="ages-served"
//                   data-scroll-animate
//                   className={`transition-all duration-1000 ${
//                     isVisible('ages-served')
//                       ? 'opacity-100 translate-y-0'
//                       : 'opacity-0 translate-y-8'
//                   }`}
//                 >
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">Ages Served</h3>
//                   <Card>
//                     <CardContent className="p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <span className="text-gray-600">Age Range:</span>
//                         <span className="font-medium text-gray-900">
//                           {mentorData.agesServed.min} - {mentorData.agesServed.max} years
//                         </span>
//                       </div>
//                       <div className="relative h-8 bg-gray-100 rounded-full mb-4">
//                         {Array.from({
//                           length: mentorData.agesServed.max - mentorData.agesServed.min + 1,
//                         }).map((_, i) => {
//                           const age = mentorData.agesServed.min + i
//                           const isPreferred = mentorData.agesServed.preferred.includes(age)
//                           return (
//                             <motion.div
//                               key={age}
//                               initial={{ opacity: 0, scale: 0 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ duration: 0.3, delay: 0.1 * i }}
//                               className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
//                                 isPreferred
//                                   ? 'bg-[#0891B2] text-white'
//                                   : 'bg-gray-200 text-gray-600 border border-gray-300'
//                               }`}
//                               style={{
//                                 left: `${
//                                   ((age - mentorData.agesServed.min) /
//                                     (mentorData.agesServed.max - mentorData.agesServed.min)) *
//                                   100
//                                 }%`,
//                               }}
//                             >
//                               {age}
//                             </motion.div>
//                           )
//                         })}
//                       </div>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium">Preferred ages:</span>{' '}
//                         {mentorData.agesServed.preferred.join(', ')}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </div>

//                 <div
//                   id="sports-played"
//                   data-scroll-animate
//                   className={`transition-all duration-1000 ${
//                     isVisible('sports-played')
//                       ? 'opacity-100 translate-y-0'
//                       : 'opacity-0 translate-y-8'
//                   }`}
//                 >
//                   <h3 className="text-xl font-bold text-gray-900 mb-4">Sports Experience</h3>
//                   <Card>
//                     <CardContent className="p-6">
//                       <div className="flex flex-wrap gap-4">
//                         {mentorData.sportsPlayed.map((sport, index) => (
//                           <motion.div
//                             key={sport}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ duration: 0.3, delay: 0.2 * index }}
//                             className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
//                               sport === 'Hockey'
//                                 ? 'bg-[#0891B2]/10 text-[#0891B2] border border-[#0891B2]/20'
//                                 : 'bg-gray-100 text-gray-700 border border-gray-200'
//                             }`}
//                           >
//                             {sport === 'Hockey' && <CheckCircle className="h-4 w-4" />}
//                             <span className="font-medium">{sport}</span>
//                           </motion.div>
//                         ))}
//                       </div>
//                       <p className="mt-4 text-sm text-gray-600">
//                         Primary focus on hockey with additional experience in other sports for
//                         cross-training benefits.
//                       </p>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </div>
//             </section>

//             {/* Experience Timeline */}
//             <section ref={sectionRefs.experience} id="experience-section" className="scroll-mt-32">
//               <div
//                 id="experience-header"
//                 data-scroll-animate
//                 className={`mb-8 transition-all duration-1000 ${
//                   isVisible('experience-header')
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-8'
//                 }`}
//               >
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
//                   Experience & Career
//                 </h2>
//               </div>

//               <div className="relative">
//                 {/* Timeline Line */}
//                 <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

//                 {/* Timeline Items */}
//                 <div className="space-y-12">
//                   {mentorData.experience.map((exp, index) => (
//                     <div
//                       key={index}
//                       id={`experience-${index}`}
//                       data-scroll-animate
//                       className={`relative pl-12 transition-all duration-1000 ${
//                         isVisible(`experience-${index}`)
//                           ? 'opacity-100 translate-y-0'
//                           : 'opacity-0 translate-y-8'
//                       }`}
//                       style={{ transitionDelay: `${index * 200}ms` }}
//                     >
//                       {/* Timeline Dot */}
//                       <div className="absolute left-0 top-0 w-8 h-8 bg-[#0891B2] rounded-full flex items-center justify-center text-white z-10">
//                         {index === 0 ? (
//                           <Award className="h-4 w-4" />
//                         ) : index === 1 ? (
//                           <Users className="h-4 w-4" />
//                         ) : (
//                           <TrendingUp className="h-4 w-4" />
//                         )}
//                       </div>

//                       <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
//                         <CardContent className="p-6">
//                           <div className="flex flex-wrap justify-between items-start mb-4">
//                             <div>
//                               <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
//                               <p className="text-[#0891B2] font-medium">{exp.organization}</p>
//                             </div>
//                             <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
//                               {exp.startDate} - {exp.endDate}
//                             </Badge>
//                           </div>
//                           <p className="text-gray-700 mb-4">{exp.description}</p>
//                           <div className="flex flex-wrap gap-2">
//                             {exp.achievements.map((achievement, i) => (
//                               <Badge
//                                 key={i}
//                                 variant="outline"
//                                 className="bg-[#0891B2]/5 text-[#0891B2] border-[#0891B2]/20"
//                               >
//                                 {achievement}
//                               </Badge>
//                             ))}
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* Media Gallery */}
//             <section ref={sectionRefs.gallery} id="gallery-section" className="scroll-mt-32">
//               <div
//                 id="gallery-header"
//                 data-scroll-animate
//                 className={`mb-8 transition-all duration-1000 ${
//                   isVisible('gallery-header')
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-8'
//                 }`}
//               >
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
//                   Media Gallery
//                 </h2>

//                 {/* Gallery Filters */}
//                 <div className="flex flex-wrap gap-2 mb-8">
//                   {galleryCategories.map((category) => (
//                     <button
//                       key={category}
//                       onClick={() => setGalleryFilter(category)}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
//                         galleryFilter === category
//                           ? 'bg-[#0891B2] text-white'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Gallery Grid */}
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                 {filteredGalleryItems.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     id={`gallery-item-${index}`}
//                     data-scroll-animate
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={
//                       isVisible(`gallery-item-${index}`)
//                         ? { opacity: 1, scale: 1 }
//                         : { opacity: 0, scale: 0.9 }
//                     }
//                     transition={{ duration: 0.4, delay: index * 0.1 }}
//                     className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
//                     onClick={() => setActiveGalleryItem(index)}
//                   >
//                     <Image
//                       src={item.url || '/placeholder.svg'}
//                       alt={item.caption}
//                       fill
//                       className="object-cover transition-transform duration-500 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
//                     {item.type === 'video' && (
//                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
//                           <Play className="h-6 w-6 text-[#0891B2] ml-1" />
//                         </div>
//                       </div>
//                     )}
//                     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <p className="text-white text-sm">{item.caption}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Lightbox */}
//               <AnimatePresence>
//                 {activeGalleryItem !== null && (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
//                     onClick={() => setActiveGalleryItem(null)}
//                   >
//                     <motion.div
//                       initial={{ scale: 0.9, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       exit={{ scale: 0.9, opacity: 0 }}
//                       className="relative max-w-4xl w-full max-h-[80vh]"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <div className="relative aspect-video">
//                         <Image
//                           src={mentorData.gallery[activeGalleryItem]?.url || '/placeholder.svg'}
//                           alt={mentorData.gallery[activeGalleryItem]?.caption || ''}
//                           fill
//                           className="object-contain"
//                         />
//                       </div>
//                       <div className="absolute top-4 right-4">
//                         <button
//                           onClick={() => setActiveGalleryItem(null)}
//                           className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-200"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M6 18L18 6M6 6l12 12"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                       <div className="bg-black/70 p-4 text-white">
//                         <p className="font-medium text-lg">
//                           {mentorData.gallery[activeGalleryItem]?.caption}
//                         </p>
//                         <p className="text-sm text-gray-300 mt-1">
//                           {mentorData.gallery[activeGalleryItem]?.category}
//                         </p>
//                       </div>
//                     </motion.div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </section>

//             {/* Reviews & Testimonials */}
//             <section ref={sectionRefs.reviews} id="reviews-section" className="scroll-mt-32">
//               <div
//                 id="reviews-header"
//                 data-scroll-animate
//                 className={`mb-8 transition-all duration-1000 ${
//                   isVisible('reviews-header')
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-8'
//                 }`}
//               >
//                 <div className="flex flex-wrap justify-between items-center">
//                   <h2 className="text-3xl font-bold text-gray-900 mb-2 font-['Space_Grotesk']">
//                     Reviews & Testimonials
//                   </h2>
//                   <div className="flex items-center space-x-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
//                     ))}
//                     <span className="ml-2 font-medium">
//                       {mentorData.reviews.reduce((acc, review) => acc + review.rating, 0) /
//                         mentorData.reviews.length}{' '}
//                       ({mentorData.reviews.length} reviews)
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Reviews Grid */}
//               <div className="space-y-6">
//                 {mentorData.reviews.map((review, index) => (
//                   <div
//                     key={review.id}
//                     id={`review-${index}`}
//                     data-scroll-animate
//                     className={`transition-all duration-1000 ${
//                       isVisible(`review-${index}`)
//                         ? 'opacity-100 translate-y-0'
//                         : 'opacity-0 translate-y-8'
//                     }`}
//                     style={{ transitionDelay: `${index * 200}ms` }}
//                   >
//                     <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
//                       <CardContent className="p-6">
//                         <div className="flex items-start space-x-4">
//                           <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
//                             <Image
//                               src={review.studentAvatar || '/placeholder.svg'}
//                               alt={review.studentName}
//                               width={48}
//                               height={48}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex flex-wrap justify-between items-start">
//                               <div>
//                                 <h3 className="font-bold text-gray-900">{review.studentName}</h3>
//                                 <div className="flex items-center space-x-1 mt-1">
//                                   {[...Array(5)].map((_, i) => (
//                                     <Star
//                                       key={i}
//                                       className={`h-4 w-4 ${
//                                         i < review.rating
//                                           ? 'text-yellow-400 fill-current'
//                                           : 'text-gray-300'
//                                       }`}
//                                     />
//                                   ))}
//                                 </div>
//                               </div>
//                               <div className="text-sm text-gray-500">{review.date}</div>
//                             </div>
//                             <div className="mt-3">
//                               <p className="text-gray-700">{review.text}</p>
//                             </div>
//                             <div className="mt-4 flex flex-wrap items-center gap-4">
//                               <Badge variant="outline" className="bg-gray-50">
//                                 {review.sessionType}
//                               </Badge>
//                               <div className="flex items-center space-x-2">
//                                 <div className="flex flex-col items-center">
//                                   <span className="text-xs text-gray-500">Before</span>
//                                   <span className="text-sm font-medium">
//                                     {review.progress.before}
//                                   </span>
//                                 </div>
//                                 <ArrowRight className="h-4 w-4 text-[#0891B2]" />
//                                 <div className="flex flex-col items-center">
//                                   <span className="text-xs text-gray-500">After</span>
//                                   <span className="text-sm font-medium text-[#0891B2]">
//                                     {review.progress.after}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Availability & Booking */}
//             <section
//               ref={sectionRefs.availability}
//               id="availability-section"
//               className="scroll-mt-32"
//             >
//               <div
//                 id="availability-header"
//                 data-scroll-animate
//                 className={`mb-8 transition-all duration-1000 ${
//                   isVisible('availability-header')
//                     ? 'opacity-100 translate-y-0'
//                     : 'opacity-0 translate-y-8'
//                 }`}
//               >
//                 <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Space_Grotesk']">
//                   Availability & Booking
//                 </h2>
//               </div>

//               <Card className="border-0 shadow-lg">
//                 <CardContent className="p-6">
//                   <div className="grid md:grid-cols-2 gap-8">
//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Session Types</h3>
//                       <div className="space-y-4">
//                         {mentorData.sessionTypes.map((session, index) => (
//                           <div
//                             key={index}
//                             className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
//                               selectedSessionType?.name === session.name
//                                 ? 'border-[#0891B2] bg-[#0891B2]/5'
//                                 : 'border-gray-200 hover:border-gray-300'
//                             }`}
//                             onClick={() => setSelectedSessionType(session)}
//                           >
//                             <div className="flex justify-between items-center">
//                               <h4 className="font-medium text-gray-900">{session.name}</h4>
//                               <Badge className="bg-[#0891B2] text-white">${session.price}</Badge>
//                             </div>
//                             <div className="flex items-center text-sm text-gray-500 mt-1">
//                               <Clock className="h-4 w-4 mr-1" />
//                               <span>{session.duration} minutes</span>
//                             </div>
//                             <p className="text-sm text-gray-600 mt-2">{session.description}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-xl font-bold text-gray-900 mb-4">Select a Date & Time</h3>
//                       <div className="grid grid-cols-4 gap-2 mb-6">
//                         {getAvailableDates()
//                           .slice(0, 8)
//                           .map((date, index) => (
//                             <button
//                               key={index}
//                               onClick={() => setSelectedDate(date.toISOString())}
//                               disabled={!hasAvailability(date)}
//                               className={`p-2 rounded-lg text-center transition-all duration-200 ${
//                                 selectedDate === date.toISOString()
//                                   ? 'bg-[#0891B2] text-white'
//                                   : hasAvailability(date)
//                                     ? 'bg-white border border-gray-200 hover:border-[#0891B2] text-gray-900'
//                                     : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                               }`}
//                             >
//                               <div className="text-xs font-medium">
//                                 {date.toLocaleDateString('en-US', { weekday: 'short' })}
//                               </div>
//                               <div className="text-lg font-bold">{date.getDate()}</div>
//                               <div className="text-xs">
//                                 {date.toLocaleDateString('en-US', { month: 'short' })}
//                               </div>
//                             </button>
//                           ))}
//                       </div>

//                       {selectedDate && (
//                         <div>
//                           <h4 className="font-medium text-gray-900 mb-3">Available Times</h4>
//                           <div className="grid grid-cols-3 gap-2">
//                             {getAvailableTimes().map((time, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => setSelectedTime(time)}
//                                 className={`p-2 rounded-lg text-center transition-all duration-200 ${
//                                   selectedTime === time
//                                     ? 'bg-[#0891B2] text-white'
//                                     : 'bg-white border border-gray-200 hover:border-[#0891B2] text-gray-900'
//                                 }`}
//                               >
//                                 {time}
//                               </button>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       <div className="mt-8">
//                         <Button
//                           className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white"
//                           size="lg"
//                           disabled={!selectedDate || !selectedTime}
//                           onClick={() => setIsBookingOpen(true)}
//                         >
//                           {!selectedDate || !selectedTime
//                             ? 'Select Date & Time'
//                             : 'Book This Session'}
//                           <Calendar className="ml-2 h-5 w-5" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </section>
//           </div>

//           {/* Right Column - Sidebar */}
//           <div className="space-y-8">
//             {/* Mentor Profile Card */}
//             <div
//               id="profile-card"
//               data-scroll-animate
//               className={`transition-all duration-1000 ${
//                 isVisible('profile-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//             >
//               <Card className="border-0 shadow-lg overflow-hidden sticky top-32">
//                 <CardContent className="p-0">
//                   <div className="aspect-square relative">
//                     <Image
//                       src={mentorData.avatar || '/placeholder.svg'}
//                       alt={mentorData.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-xl font-bold text-gray-900 mb-1">{mentorData.name}</h3>
//                     <p className="text-[#0891B2] font-medium mb-4">{mentorData.position}</p>

//                     <div className="space-y-3 mb-6">
//                       <div className="flex items-center space-x-3">
//                         <Users className="h-5 w-5 text-gray-400" />
//                         <span className="text-gray-700">{mentorData.currentTeam}</span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <MapPin className="h-5 w-5 text-gray-400" />
//                         <span className="text-gray-700">
//                           {mentorData.location.city}, {mentorData.location.state}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-3">
//                         <Award className="h-5 w-5 text-gray-400" />
//                         <span className="text-gray-700">3x All-American</span>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                       <div className="text-center p-3 bg-gray-50 rounded-lg">
//                         <div className="text-2xl font-bold text-[#0891B2]">
//                           {mentorData.successMetrics.studentsHelped}
//                         </div>
//                         <div className="text-sm text-gray-600">Students Helped</div>
//                       </div>
//                       <div className="text-center p-3 bg-gray-50 rounded-lg">
//                         <div className="text-2xl font-bold text-[#0891B2]">
//                           {mentorData.successMetrics.d1Commitments}
//                         </div>
//                         <div className="text-sm text-gray-600">D1 Commitments</div>
//                       </div>
//                       <div className="text-center p-3 bg-gray-50 rounded-lg">
//                         <div className="text-2xl font-bold text-[#0891B2]">
//                           {mentorData.successMetrics.averageImprovement}
//                         </div>
//                         <div className="text-sm text-gray-600">Avg. Improvement</div>
//                       </div>
//                       <div className="text-center p-3 bg-gray-50 rounded-lg">
//                         <div className="text-2xl font-bold text-[#0891B2]">
//                           {mentorData.successMetrics.successRate}%
//                         </div>
//                         <div className="text-sm text-gray-600">Success Rate</div>
//                       </div>
//                     </div>

//                     <Button
//                       className="w-full bg-[#0891B2] hover:bg-[#0E7490] text-white"
//                       size="lg"
//                       onClick={() => setIsBookingOpen(true)}
//                     >
//                       Book a Session
//                       <Calendar className="ml-2 h-5 w-5" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Location Card */}
//             <div
//               id="location-card"
//               data-scroll-animate
//               className={`transition-all duration-1000 ${
//                 isVisible('location-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//             >
//               <Card className="border-0 shadow-lg overflow-hidden">
//                 <CardContent className="p-0">
//                   <div className="aspect-video relative bg-gray-200">
//                     {/* Map placeholder - would be replaced with actual map component */}
//                     <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
//                       <MapPin className="h-8 w-8 text-gray-400" />
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="text-lg font-bold text-gray-900 mb-2">Location & Travel</h3>
//                     <div className="flex items-center space-x-2 mb-4">
//                       <MapPin className="h-5 w-5 text-[#0891B2]" />
//                       <span className="text-gray-700">
//                         {mentorData.location.city}, {mentorData.location.state}
//                       </span>
//                     </div>

//                     <div className="space-y-3 text-sm">
//                       <div className="flex items-start space-x-2">
//                         <Check className="h-4 w-4 text-green-500 mt-0.5" />
//                         <span className="text-gray-700">In-person sessions available</span>
//                       </div>
//                       <div className="flex items-start space-x-2">
//                         <Check className="h-4 w-4 text-green-500 mt-0.5" />
//                         <span className="text-gray-700">
//                           Willing to travel up to {mentorData.location.travelRadius} miles
//                         </span>
//                       </div>
//                       <div className="flex items-start space-x-2">
//                         <Check className="h-4 w-4 text-green-500 mt-0.5" />
//                         <span className="text-gray-700">Virtual sessions available worldwide</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* FAQs */}
//             <div
//               id="faq-card"
//               data-scroll-animate
//               className={`transition-all duration-1000 ${
//                 isVisible('faq-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//             >
//               <Card className="border-0 shadow-lg">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">
//                     Frequently Asked Questions
//                   </h3>
//                   <div className="space-y-4">
//                     {mentorData.faqs.map((faq, index) => (
//                       <details key={index} className="group">
//                         <summary className="flex items-center justify-between cursor-pointer">
//                           <h4 className="text-sm font-medium text-gray-900">{faq.question}</h4>
//                           <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" />
//                         </summary>
//                         <p className="mt-2 text-sm text-gray-600">{faq.answer}</p>
//                       </details>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Contact Card */}
//             <div
//               id="contact-card"
//               data-scroll-animate
//               className={`transition-all duration-1000 ${
//                 isVisible('contact-card') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
//               }`}
//             >
//               <Card className="border-0 shadow-lg">
//                 <CardContent className="p-6">
//                   <h3 className="text-lg font-bold text-gray-900 mb-4">Have Questions?</h3>
//                   <p className="text-sm text-gray-600 mb-4">
//                     Not ready to book yet? Send a message and I&apos;ll get back to you within 24
//                     hours.
//                   </p>
//                   <div className="space-y-4">
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-[#0891B2]/10 flex items-center justify-center">
//                         <Mail className="h-5 w-5 text-[#0891B2]" />
//                       </div>
//                       <div>
//                         <div className="text-xs text-gray-500">Email</div>
//                         <div className="text-sm font-medium">jake.morrison@performix.com</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="w-10 h-10 rounded-full bg-[#0891B2]/10 flex items-center justify-center">
//                         <Phone className="h-5 w-5 text-[#0891B2]" />
//                       </div>
//                       <div>
//                         <div className="text-xs text-gray-500">Phone</div>
//                         <div className="text-sm font-medium">(617) 555-0123</div>
//                       </div>
//                     </div>
//                   </div>
//                   <Button variant="outline" className="w-full mt-4 border-[#0891B2] text-[#0891B2]">
//                     Send Message
//                     <MessageCircle className="ml-2 h-5 w-5" />
//                   </Button>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Call-to-Action Section */}
//       <section className="bg-gradient-to-r from-[#0891B2] to-[#0E7490] py-16">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="max-w-3xl mx-auto text-center">
//             <h2 className="text-3xl font-bold text-white mb-6 font-['Space_Grotesk']">
//               Ready to Take Your Game to the Next Level?
//             </h2>
//             <p className="text-white/90 text-lg mb-8">
//               Join the 50+ players who have secured D1 commitments with Jake&apos;s mentorship. Book
//               your session today and start your journey to hockey excellence.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Button
//                 size="lg"
//                 className="bg-white text-[#0891B2] hover:bg-gray-100"
//                 onClick={() => setIsBookingOpen(true)}
//               >
//                 Book a Session
//                 <Calendar className="ml-2 h-5 w-5" />
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white/10"
//                 onClick={() => scrollToSection('about')}
//               >
//                 Learn More
//                 <ChevronRight className="ml-2 h-5 w-5" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       {/* <footer className="bg-gray-900 text-white py-12">
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid md:grid-cols-4 gap-8">
//               <div>
//                 <PerformixLogo />
//                 <p className="mt-4 text-gray-400">
//                   Connecting elite hockey players with D1 mentors to accelerate your path to success.
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold mb-4">Quick Links</h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link href="/" className="text-gray-400 hover:text-white transition-colors">
//                       Home
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/mentors" className="text-gray-400 hover:text-white transition-colors">
//                       Browse Mentors
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/testimonials" className="text-gray-400 hover:text-white transition-colors">
//                       Success Stories
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">
//                       Resources
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold mb-4">Legal</h3>
//                 <ul className="space-y-2">
//                   <li>
//                     <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
//                       Terms of Service
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
//                       Privacy Policy
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
//                       Cookie Policy
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold mb-4">Connect</h3>
//                 <div className="flex space-x-4 mb-4">
//                   <Link
//                     href="#"
//                     className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0891B2] transition-colors duration-300"
//                   >
//                     <Instagram className="h-5 w-5" />
//                   </Link>
//                   <Link
//                     href="#"
//                     className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0891B2] transition-colors duration-300"
//                   >
//                     <TikTokIcon />
//                   </Link>
//                   <Link
//                     href="#"
//                     className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0891B2] transition-colors duration-300"
//                   >
//                     <Youtube className="h-5 w-5" />
//                   </Link>
//                 </div>
//                 <p className="text-gray-400">
//                   © {new Date().getFullYear()} Performix. <br />
//                   All rights reserved.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </footer> */}

//       {/* Booking Modal */}
//       <AnimatePresence>
//         {isBookingOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
//             onClick={() => setIsBookingOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     Book a Session with {mentorData.name}
//                   </h2>
//                   <button
//                     onClick={() => setIsBookingOpen(false)}
//                     className="text-gray-400 hover:text-gray-500 transition-colors"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Session Details</h3>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="flex justify-between items-center mb-2">
//                         <span className="font-medium">{selectedSessionType?.name}</span>
//                         <Badge className="bg-[#0891B2] text-white">
//                           ${selectedSessionType?.price}
//                         </Badge>
//                       </div>
//                       <div className="flex items-center text-sm text-gray-500 mb-2">
//                         <Clock className="h-4 w-4 mr-1" />
//                         <span>{selectedSessionType?.duration} minutes</span>
//                       </div>
//                       <p className="text-sm text-gray-600">{selectedSessionType?.description}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Date & Time</h3>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="flex items-center space-x-2 text-gray-700">
//                         <Calendar className="h-5 w-5 text-[#0891B2]" />
//                         <span>
//                           {selectedDate
//                             ? new Date(selectedDate).toLocaleDateString('en-US', {
//                                 weekday: 'long',
//                                 month: 'long',
//                                 day: 'numeric',
//                               })
//                             : 'Select a date'}
//                         </span>
//                       </div>
//                       <div className="flex items-center space-x-2 text-gray-700 mt-2">
//                         <Clock className="h-5 w-5 text-[#0891B2]" />
//                         <span>{selectedTime || 'Select a time'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Your Information</h3>
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label
//                             htmlFor="firstName"
//                             className="block text-sm font-medium text-gray-700 mb-1"
//                           >
//                             First Name
//                           </label>
//                           <input
//                             type="text"
//                             id="firstName"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
//                           />
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="lastName"
//                             className="block text-sm font-medium text-gray-700 mb-1"
//                           >
//                             Last Name
//                           </label>
//                           <input
//                             type="text"
//                             id="lastName"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="email"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           id="email"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="phone"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Phone
//                         </label>
//                         <input
//                           type="tel"
//                           id="phone"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
//                         />
//                       </div>
//                       <div>
//                         <label
//                           htmlFor="notes"
//                           className="block text-sm font-medium text-gray-700 mb-1"
//                         >
//                           Special Requests or Notes
//                         </label>
//                         <textarea
//                           id="notes"
//                           rows={3}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
//                         ></textarea>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">Payment</h3>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <div className="flex justify-between items-center mb-4">
//                         <span className="font-medium">Total</span>
//                         <span className="text-xl font-bold text-[#0891B2]">
//                           ${selectedSessionType?.price || 0}
//                         </span>
//                       </div>
//                       <p className="text-sm text-gray-600 mb-4">
//                         Secure payment processing. You will not be charged until your session is
//                         confirmed.
//                       </p>
//                       <div className="flex items-center space-x-2 mb-4">
//                         <div className="w-10 h-6 bg-blue-600 rounded"></div>
//                         <div className="w-10 h-6 bg-red-500 rounded"></div>
//                         <div className="w-10 h-6 bg-gray-800 rounded"></div>
//                         <span className="text-sm text-gray-600">and more...</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end space-x-4">
//                     <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button
//                       className="bg-[#0891B2] hover:bg-[#0E7490] text-white"
//                       onClick={handleBookSession}
//                       disabled={isLoading}
//                     >
//                       {isLoading ? (
//                         <>
//                           <svg
//                             className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                           >
//                             <circle
//                               className="opacity-25"
//                               cx="12"
//                               cy="12"
//                               r="10"
//                               stroke="currentColor"
//                               strokeWidth="4"
//                             ></circle>
//                             <path
//                               className="opacity-75"
//                               fill="currentColor"
//                               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                             ></path>
//                           </svg>
//                           Processing...
//                         </>
//                       ) : (
//                         'Complete Booking'
//                       )}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }
