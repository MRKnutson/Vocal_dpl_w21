Rails.application.routes.draw do
  mount_devise_token_auth_for "User", at: "api/auth"
  namespace :api do
    resources :recordings, only: [:index, :create, :update, :destroy]
    resources :tags, only: [:index, :destroy, :create]
    resources :users
    post "users/image", to: "users#profile_image"
  end

  get "*other", to: "static#index"
end
