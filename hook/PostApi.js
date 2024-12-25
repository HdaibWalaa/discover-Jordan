import BASE_URL from "./apiConfig";

async function createComment(token, postId, content) {
  const url = `${BASE_URL}/post/comment/store`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: new FormData().append("post_id", postId).append("content", content),
  });
  return response.json();
}

async function updateComment(token, commentId, content) {
  const url = `${BASE_URL}/post/comment/update/${commentId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: new FormData().append("content", content),
  });
  return response.json();
}

async function deleteComment(token, commentId) {
  const url = `${BASE_URL}/post/comment/delete/${commentId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}

async function likeDislikeComment(token, commentId, action) {
  const url = `${BASE_URL}/post/comment/like-dislike/${action}/${commentId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}

async function createPost(
  token,
  visitableType,
  visitableId,
  content,
  media,
  privacy
) {
  const url = `${BASE_URL}/post/store`;
  const formData = new FormData();
  formData.append("visitable_type", visitableType);
  formData.append("visitable_id", visitableId);
  formData.append("content", content);
  formData.append("privacy", privacy);

  media.forEach((file, index) => {
    const type = file.type === "video" ? "video/mp4" : "image/jpg";
    formData.append("media[]", {
      uri: file.uri,
      name: `media_${index}.${file.type === "video" ? "mp4" : "jpg"}`,
      type,
    });
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });
  return response.json();
}


async function updatePost(
  token,
  postId,
  visitableType,
  visitableId,
  content,
  media,
  privacy
) {
  const url = `${BASE_URL}/post/update/${postId}`;
  const formData = new FormData();
  formData.append("visitable_type", visitableType);
  formData.append("visitable_id", visitableId);
  formData.append("content", content);
  media.forEach((file, index) => {
    formData.append("media[]", {
      uri: file,
      name: `media_${index}.jpg`,
      type: "image/jpg",
    });
  });
  formData.append("privacy", privacy);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  });
  return response.json();
}

async function deletePost(token, postId) {
  const url = `${BASE_URL}/post/delete/${postId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}

async function favoritePost(token, postId) {
  const url = `${BASE_URL}/post/favorite/${postId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}

async function unfavoritePost(token, postId) {
  const url = `${BASE_URL}/post/favorite/${postId}/delete`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}

async function getFollowingsPosts(token) {
  const url = `${BASE_URL}/post/followings`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return response.json();
}

export {
  createComment,
  updateComment,
  deleteComment,
  likeDislikeComment,
  createPost,
  updatePost,
  deletePost,
  favoritePost,
  unfavoritePost,
  getFollowingsPosts,
};
