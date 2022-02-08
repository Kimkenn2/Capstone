class CompletedTasksController < ApplicationController
    def index
        render json: CompletedTask.all
    end

    def show
        completedtask = CompletedTask.find(params[:id])
        render json: completedtask
    end

    def create
        completed = CompletedTask.create(completedTask_params)
        render json: completed
    end

    def destroy
        completedtask = CompletedTask.find(params[:id]).destroy
        render json: completedtask
    end

    def completedTask_params
        params.permit(:task_id, :completed, :user_id)
    end

end
