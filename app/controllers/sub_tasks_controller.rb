class SubTasksController < ApplicationController
    def index
        subtasks = SubTask.all
        render json: subtasks
    end

    def create
        subtask = SubTask.create(subtask_params)
        render json: subtask, status: 202
    end

    def show
        render json: SubTask.find(params[:id])
    end

    def update
        subtask = SubTask.find(params[:id])
        subtask.update(subtask_params)
    end

    def destroy
        subtask = SubTask.find(params[:id])
        subtask.destroy
    end


    def subtask_params
        params.permit(:title, :task_index, :task_id, :checklist_id)
    end
end
