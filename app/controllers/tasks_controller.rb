class TasksController < ApplicationController

    def index
        task = Task.all
        render json: task
    end

    def create
        task = Task.create(task_params)
        render json: task, status: 202
    end

    def show
        task = Task.find(params[:id])
        render json: task
    end


    def task_params
        params.permit(:title, :index, :checklist_id)
    end
end
