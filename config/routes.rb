Rails.application.routes.draw do
  
  resources :sub_tasks
  resources :tasks
  resources :checklists
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '/checklists/:id/tasks', to: 'checklists#showtasks'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
