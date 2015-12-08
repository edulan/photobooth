require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => '/sidekiq'

  resources :booths, path: 'b',
                     param: :token,
                     only: [:new, :show, :create]

  scope 'api' do
    resources :clips, only: [:index, :show, :create, :update, :destroy] do
      put :upvote, on: :member
    end
  end

  root 'booths#new'
end
