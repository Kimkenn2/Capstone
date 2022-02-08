Rails.application.routes.draw do
  
  resources :completed_tasks
  resources :checklists
  resources :users
  resources :sub_tasks
  resources :tasks
  get '/me', to: "users#showme"
  get '/signup', to: "users#create"
  get '/users/:id/checklists', to: "users#showChecklists"
  get '/users/:id/completedtasks', to: "users#showCompletedTasks"
  get '/users/:id/publiclists', to: "users#showallpublic"
  get '/checklistspublic', to: "checklists#showPublic"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get '/checklists/:id/tasks', to: 'checklists#showtasks'
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
