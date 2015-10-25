Rails.application.routes.draw do
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
