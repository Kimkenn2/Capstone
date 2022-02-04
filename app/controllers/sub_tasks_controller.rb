class SubTasksController < ApplicationController
    def index
        subtasks = SubTask.all
        render json: subtasks
    end

    def create
        subtask = SubTask.create(subtask_params)
        render json: subtask, status: 202
    end


    def subtask_params
        params.permit(:title, :task_index, :task_id, :checklist_id)
    end
end
