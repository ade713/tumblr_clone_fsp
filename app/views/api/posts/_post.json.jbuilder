json.extract! post, :id, :title, :body,
                    :likes_count, :url, :author_id, :created_at
json.image_url asset_path(post.image.url)
