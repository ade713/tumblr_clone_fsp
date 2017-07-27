Rails.application.routes.draw do
  
  root 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :index, :show, :update, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy]
  end
end
