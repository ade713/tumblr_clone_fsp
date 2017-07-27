export const fetchAllPosts = () => {
  return $.ajax({
    method: 'GET',
    url: 'api/posts'
  });
};

export const fetchPost = id => {
  return $.ajax({
    method: 'GET',
    url: `api/posts/${id}`
  });
};

export const createPost = post => {
  return $.ajax({
    method: 'POST',
    url: 'api/posts',
    data: { post }
  });
};

export const createMediaPost = formData => {
  console.log(formData);
  return $.ajax({
    method: 'POST',
    url: 'api/posts',
    contentType: false,
    processData: false,
    data: formData
  });
};

export const updatePost = post => {
  return $.ajax({
    method: 'PATCH',
    url: `api/posts/${post.id}`,
    data: { post }
  });
};

export const deletePost = post => {
  return $.ajax({
    method: 'DELETE',
    url: `api/posts/${post.id}`
  });
};

export const createLike = like => {
  return $.ajax({
    method: 'POST',
    url: 'api/follows'
  });
};

export const deleteLike = id => {
  return $.ajax({
    method: 'DELETE',
    url: 'api/follows/id'
  });
};
