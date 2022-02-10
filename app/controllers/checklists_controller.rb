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

    def showPublic
        checklists = Checklist.where(public: true)
        render json: checklists
    end

    def create
        checklist = Checklist.create(checklist_params)
        render json: checklist, status: 202
    end
    
    def update
        checklist = Checklist.find(params[:id])
        checklist.update(checklist_params)
    render json: checklist
    end


    def destroy
        checklist = Checklist.find(params[:id])
        # checklistsubtasks = checklist.tasks.subtasks.destroy_all
        # checklisttasks = checklist.tasks.destroy_all
        checklistdelete = checklist.destroy
        render json: checklistdelete
    end


    def checklist_params
        params.permit(:title, :user_id, :public)
    end

end
