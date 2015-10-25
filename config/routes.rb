Rails.application.routes.draw do
  scope 'api' do
    resources :clips, only: [:index, :show, :create, :update, :destroy] do
      put :upvote, on: :member
    end
  end

  root 'home#index'
end
