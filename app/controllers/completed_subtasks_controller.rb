class CompletedSubtasksController < ApplicationController
    def index
        render json: CompletedSubtask.all
    end

    def show
        completedtask = CompletedSubtask.find(params[:id])
        render json: completedtask
    end

    def create
        completed = CompletedSubtask.create(completedSubtask_params)
        render json: completed
    end

    def destroy
        completedtask = CompletedSubtask.find(params[:id]).destroy
        render json: completedtask
    end

    def completedSubtask_params
        params.permit(:sub_task_id, :user_id)
    end

end
