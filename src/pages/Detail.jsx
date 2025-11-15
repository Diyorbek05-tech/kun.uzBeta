import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft } from 'lucide-react'
import { getSavedPosts, toggleSavePost, isPostSaved } from '../utils/savedPosts'

const Detail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedPosts, setSavedPosts] = useState(getSavedPosts())

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`)
        if (!response.ok) {
          throw new Error('Post not found')
        }
        const data = await response.json()
        setPost(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    }
  }, [id])

  const getRandomImage = (width = 800, height = 600, seed = null) => {
    const imageSeed = seed || Math.floor(Math.random() * 1000)
    return `https://picsum.photos/seed/${imageSeed}/${width}/${height}`
  }

  if (loading) {
    return (
      <div className="mx-15 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl">{t('homePage.loading')}</div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="mx-15 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-xl text-red-600 mb-4">{t('homePage.error')}: {error || 'Post not found'}</div>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('notFound.home_button')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-15 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
      >
        <ArrowLeft size={20} />
        {t('notFound.back_button')}
      </button>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
        <div className="relative h-96 overflow-hidden">
          <img
            src={getRandomImage(1200, 600, post.id)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => {
              toggleSavePost(post)
              setSavedPosts(getSavedPosts())
            }}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-colors z-10"
          >
            <i className={isPostSaved(post.id) ? "fa-solid fa-bookmark text-blue-600 text-xl" : "fa-regular fa-bookmark text-gray-700 text-xl"}></i>
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {post.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded hover:bg-blue-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 border-b border-gray-200 pb-4">
            <span className="flex items-center gap-1">
              <i className="fas fa-eye text-gray-400"></i>
              {post.views || 0} {t('detailPage.views')}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-thumbs-up text-gray-400"></i>
              {post.reactions?.likes || 0} {t('detailPage.likes')}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-thumbs-down text-gray-400"></i>
              {post.reactions?.dislikes || 0} {t('detailPage.dislikes')}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-user text-gray-400"></i>
              User ID: {post.userId}
            </span>
            <span className="flex items-center gap-1">
              <i className="fas fa-calendar text-gray-400"></i>
              {new Date().toLocaleDateString('uz-UZ', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
              {post.body}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <i className="fas fa-thumbs-up"></i>
                {post.reactions?.likes || 0}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <i className="fas fa-thumbs-down"></i>
                {post.reactions?.dislikes || 0}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail

