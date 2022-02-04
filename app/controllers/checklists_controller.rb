class ChecklistsController < ApplicationController

    def index
        checklist = Checklist.all
        render json: checklist
    end

    def show
        checklist = Checklist.find(params[:id])
        render json: checklist
    end

    def showtasks
        checklist = Checklist.find(params[:id])
        checklistTasks = checklist.tasks
        render json: checklistTasks
    end

    def create
        checklist = Checklist.create(checklist_params)
        render json: checklist, status: 202
    end


    def checklist_params
        params.permit(:title, :user_id)
    end
end
