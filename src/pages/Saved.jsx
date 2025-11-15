import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getSavedPosts, toggleSavePost, isPostSaved } from '../utils/savedPosts'

const Saved = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [savedPosts, setSavedPosts] = useState(getSavedPosts())

  const getRandomImage = (width = 800, height = 600, seed = null) => {
    const imageSeed = seed || Math.floor(Math.random() * 1000)
    return `https://picsum.photos/seed/${imageSeed}/${width}/${height}`
  }

  const handleSaveClick = (e, post) => {
    e.stopPropagation()
    toggleSavePost(post)
    setSavedPosts(getSavedPosts())
  }

  useEffect(() => {
    const handleStorageChange = () => {
      setSavedPosts(getSavedPosts())
    }
    
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (savedPosts.length === 0) {
    return (
      <div className="mx-15 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('savedPage.no_saved_posts')}</h2>
          <p className="text-gray-600 mb-6">{t('savedPage.no_saved_description')}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('savedPage.browse_posts')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-15 py-6 px-5">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('savedPage.saved_posts')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/post/${post.id}`)}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={getRandomImage(400, 300, post.id)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => handleSaveClick(e, post)}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors z-10"
              >
                <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600" : "fa-regular fa-bookmark text-gray-700"}></i>
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-snug hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-3">
                {post.body}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{t('savedPage.post_id')}: {post.id}</span>
                <span>{new Date().toLocaleDateString('uz-UZ')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Saved
