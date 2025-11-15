const SAVED_POSTS_KEY = 'savedPosts'

export const getSavedPosts = () => {
  try {
    const saved = localStorage.getItem(SAVED_POSTS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error getting saved posts:', error)
    return []
  }
}

export const savePost = (post) => {
  try {
    const savedPosts = getSavedPosts()
    const exists = savedPosts.find(p => p.id === post.id)
    if (!exists) {
      const updated = [...savedPosts, post]
      localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(updated))
      return true
    }
    return false
  } catch (error) {
    console.error('Error saving post:', error)
    return false
  }
}

export const removePost = (postId) => {
  try {
    const savedPosts = getSavedPosts()
    const updated = savedPosts.filter(p => p.id !== postId)
    localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(updated))
    return true
  } catch (error) {
    console.error('Error removing post:', error)
    return false
  }
}

export const isPostSaved = (postId) => {
  const savedPosts = getSavedPosts()
  return savedPosts.some(p => p.id === postId)
}

export const toggleSavePost = (post) => {
  if (isPostSaved(post.id)) {
    removePost(post.id)
    return false
  } else {
    savePost(post)
    return true
  }
}

