Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :recordings, only: [:index, :create, :update, :destroy]
    resources :tags, only: [:index, :destroy]
    resources :users
  end
end
