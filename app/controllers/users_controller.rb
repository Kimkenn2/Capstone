class UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]

    # GET /users
    def index
      @users = User.all
  
      render json: @users
    end
  
    # GET /users/1
    def show
      render json: @user
    end
  
    def showme
      if current_user
        render json: current_user, status: :ok
      else
        render json: "No current session stored", status: :unauthorized
      end
    end

    def showChecklists
      checklists = Checklist.where(user_id: params[:id])
      render json: checklists
    end

    def showCompletedTasks
      completedtasks = CompletedTask.where(user_id: params[:id])
      render json: completedtasks
    end

    def showallpublic
      checklistpublic = Checklist.where(public: true)
      checklists = checklistpublic.where(user_id: params[:id])
      render json: checklists
    end
  
    # POST /users
    def create
      user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id # this is the piece that logs a user in and keeps track of users info in subsequent requests.
          render json: user, status: :ok
        else
          render json: user.errors.full_messages, status: :unprocessable_entity
        end
    end
  
    # PATCH/PUT /users/1
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /users/1
    def destroy
      @user.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def user_params
        params.permit(:username, :password)
      end
end
