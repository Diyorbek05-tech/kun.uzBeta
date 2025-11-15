import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getSavedPosts, toggleSavePost, isPostSaved } from '../utils/savedPosts'

const HomePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedPosts, setSavedPosts] = useState(getSavedPosts())

  useEffect(() => {
    const fetchPosts = async () => {
      try{
        const response = await fetch(`https://dummyjson.com/posts`)
        const data = await response.json()
        setPosts(data.posts || [])
        setLoading(false)
      }
      catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
  fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl">{t('homePage.loading')}</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-red-600">{t('homePage.error')}: {error}</div>
        </div>
      </div>
    )
  }

  const getRandomImage = (width = 800, height = 600, seed = null) => {
      const imageSeed = seed || Math.floor(Math.random() * 1000)
      return `https://picsum.photos/seed/${imageSeed}/${width}/${height}`
    }

  const handleSaveClick = (e, post) => {
      e.stopPropagation()
      toggleSavePost(post)
      setSavedPosts(getSavedPosts())
    }

  const featuredPost = posts[0]
  const sidebarNews = posts.slice(1, 6)
  const articles = posts.slice(6, 14)
  const editorChoice = posts.slice(14, 17)
  const latestNews = posts.slice(17, 22)

  return (
   <div className="mx-15 py-4">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
           <div className="lg:col-span-8">
             {featuredPost && (
               <div 
                 onClick={() => navigate(`/post/${featuredPost.id}`)}
                 className="bg-white rounded overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
               >
                 <div className="relative h-96 overflow-hidden">
                   <img
                     src={getRandomImage(800, 400, featuredPost.id)}
                     alt={featuredPost.title}
                     className="w-full h-full object-cover"
                   />
                   <button
                     onClick={(e) => handleSaveClick(e, featuredPost)}
                     className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
                   >
                     <i className={isPostSaved(featuredPost.id) ? "fa-solid fa-bookmark text-blue-600" : "fa-regular fa-bookmark text-gray-700"}></i>
                   </button>
                 </div>
                 <div className="p-5">
                   <div className="flex items-center gap-2 mb-3">
                     {featuredPost.tags?.slice(0, 2).map((tag, idx) => (
                       <span
                         key={idx}
                         className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                   <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors">
                     {featuredPost.title}
                   </h1>
                   <p className="text-gray-600 text-base mb-4 line-clamp-3 leading-relaxed">
                     {featuredPost.body}
                   </p>
                   <div className="flex items-center justify-between text-sm text-gray-500">
                     <div className="flex items-center gap-4">
                       <span className="flex items-center gap-1">
                         <i className="fa-solid fa-eye"></i>
                         {featuredPost.views || 0}
                       </span>
                       <span className="flex items-center gap-1">
                         <i className="fa-solid fa-thumbs-up"></i>
                         {featuredPost.reactions?.likes || 0}
                       </span>
                     </div>
                     <span className="text-gray-400">{new Date().toLocaleDateString('Uz-Uz')}</span>
                   </div>
                 </div>
               </div>
             )}
           </div>
   
           <div className="lg:col-span-4">
             <div className="bg-white rounded shadow-sm border border-gray-200 p-4">
               <div className="space-y-4">
                 {sidebarNews.map((post, idx) => (
                   <div
                     key={post.id}
                     onClick={() => navigate(`/post/${post.id}`)}
                     className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0 hover:opacity-80 transition-opacity cursor-pointer relative"
                   >
                     <div className="w-24 h-20 flex-shrink-0 rounded overflow-hidden relative">
                       <img
                         src={getRandomImage(200, 150, post.id)}
                         alt={post.title}
                         className="w-full h-full object-cover"
                       />
                       <button
                         onClick={(e) => handleSaveClick(e, post)}
                         className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors z-10"
                       >
                         <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600 text-xs" : "fa-regular fa-bookmark text-gray-700 text-xs"}></i>
                       </button>
                     </div>
                     <div className="flex-1 min-w-0">
                       <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                         {post.title}
                       </h3>
                       <p className="text-xs text-gray-500">
                         {new Date().toLocaleTimeString('uz-UZ', {
                           hour: '2-digit',
                           minute: '2-digit',
                         })} / {new Date().toLocaleDateString('uz-UZ')}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
               <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                 {t('homePage.more')}
                 <i className="fas fa-arrow-right"></i>
               </button>
             </div>
           </div>
         </div>
   
         <div className="mb-6">
           <div className="flex items-center gap-2 mb-4">
             <h2 className="text-xl font-bold text-gray-900">{t('homePage.articles')}</h2>
             <i className="fas fa-star text-yellow-500"></i>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {articles.map((post) => (
               <div
                 key={post.id}
                 onClick={() => navigate(`/post/${post.id}`)}
                 className="bg-white rounded overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
               >
                 <div className="relative h-40 overflow-hidden">
                   <img
                     src={getRandomImage(300, 200, post.id + 100)}
                     alt={post.title}
                     className="w-full h-full object-cover"
                   />
                   <button
                     onClick={(e) => handleSaveClick(e, post)}
                     className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
                   >
                     <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600" : "fa-regular fa-bookmark text-gray-700"}></i>
                   </button>
                 </div>
                 <div className="p-3">
                   <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                     {post.title}
                   </h3>
                 </div>
               </div>
             ))}
           </div>
         </div>
   
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
           <div className="lg:col-span-7">
             <div className="space-y-3">
               {posts.slice(22, 28).map((post) => (
                 <div
                   key={post.id}
                   onClick={() => navigate(`/post/${post.id}`)}
                   className="bg-white rounded overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                 >
                   <div className="flex gap-3 p-3">
                     <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden relative">
                       <img
                         src={getRandomImage(150, 150, post.id)}
                         alt={post.title}
                         className="w-full h-full object-cover"
                       />
                       <button
                         onClick={(e) => handleSaveClick(e, post)}
                         className="absolute top-1 right-1 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors z-10"
                       >
                         <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600 text-xs" : "fa-regular fa-bookmark text-gray-700 text-xs"}></i>
                       </button>
                     </div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1.5">
                         {post.tags?.slice(0, 1).map((tag, idx) => (
                           <span
                             key={idx}
                             className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                           >
                             {tag}
                           </span>
                         ))}
                       </div>
                       <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                         {post.title}
                       </h3>
                       <p className="text-gray-600 text-xs line-clamp-2 mb-2 leading-relaxed">
                         {post.body}
                       </p>
                       <div className="flex items-center gap-3 text-xs text-gray-500">
                         <span className="flex items-center gap-1">
                           <i className="fas fa-eye text-gray-400"></i>
                           {post.views || 0}
                         </span>
                         <span className="flex items-center gap-1">
                           <i className="fas fa-thumbs-up text-gray-400"></i>
                           {post.reactions?.likes || 0}
                         </span>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
   
           <div className="lg:col-span-3">
             <div className="bg-white rounded shadow-sm border border-gray-200 p-3">
               <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
                 {t('homePage.editor_choice')}
               </h2>
               <div className="space-y-3 max-h-[600px] overflow-y-auto">
                 {editorChoice.map((post) => (
                   <div 
                     key={post.id} 
                     onClick={() => navigate(`/post/${post.id}`)}
                     className="border-b border-gray-200 pb-3 last:border-0 cursor-pointer hover:bg-gray-50 px-1 py-1.5 rounded transition-colors relative"
                   >
                     <button
                       onClick={(e) => handleSaveClick(e, post)}
                       className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors z-10"
                     >
                       <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600 text-xs" : "fa-regular fa-bookmark text-gray-700 text-xs"}></i>
                     </button>
                     <div className="flex items-center gap-1.5 mb-1.5">
                       {post.tags?.slice(0, 1).map((tag, idx) => (
                         <span
                           key={idx}
                           className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded"
                         >
                           {tag}
                         </span>
                       ))}
                     </div>
                     <h3 className="text-xs font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                       {post.title}
                     </h3>
                     <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed">
                       {post.body}
                     </p>
                   </div>
                 ))}
               </div>
             </div>
           </div>
   
           <div className="lg:col-span-2">
             <div className="bg-white rounded shadow-sm border border-gray-200 p-3 sticky top-4">
               <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-300">
                 {t('homePage.latest_news')}
               </h2>
               <div className="space-y-2 max-h-[600px] overflow-y-auto">
                 {latestNews.map((post) => (
                   <div
                     key={post.id}
                     onClick={() => navigate(`/post/${post.id}`)}
                     className="border-b border-gray-200 pb-2 last:border-0 hover:bg-gray-50 px-1 py-1.5 rounded transition-colors cursor-pointer relative"
                   >
                     <button
                       onClick={(e) => handleSaveClick(e, post)}
                       className="absolute top-2 right-2 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-md transition-colors z-10"
                     >
                       <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600 text-xs" : "fa-regular fa-bookmark text-gray-700 text-xs"}></i>
                     </button>
                     <div className="flex items-center gap-1.5 mb-1">
                       <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                         {post.tags?.[0] || t('homePage.news')}
                       </span>
                       <span className="text-xs text-gray-400">-</span>
                       <span className="text-xs text-gray-400">
                         {new Date().toLocaleTimeString('uz-UZ', {
                           hour: '2-digit',
                           minute: '2-digit',
                         })}
                       </span>
                     </div>
                     <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                       {post.title}
                     </h3>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </div>
  )
}

export default HomePage
