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

    def update
        task = Task.find(params[:id])
        task.update(task_params)
    end

    def destroy
        task = Task.find(params[:id])
        task.destroy
    end

    def task_params
        params.permit(:title, :index, :checklist_id)
    end
end
