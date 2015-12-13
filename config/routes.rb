require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  resources :booths, path: 'b',
                     param: :token,
                     only: [:new, :show, :create]

  scope 'api' do
    resources :clips, only: [:index, :show, :create, :destroy]
    resources :upvotes, only: [:create]
  end

  root 'booths#new'
end
