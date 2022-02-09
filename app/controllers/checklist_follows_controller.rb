class ChecklistFollowsController < ApplicationController
    def index
        checklistfollows = ChecklistFollow.all
        render json: checklistfollows
    end

    def create
        follow = ChecklistFollow.create(checklistfollowsparams)
        render json: follow, status: 202
    end

    def show
        follows = ChecklistFollow.find(params[:id])
        render json: follows
    end

    def destroy
        unfollow = ChecklistFollow.find(params[:id]).destroy
        render json: unfollow
    end

    def checklistfollowsparams
        params.permit(:checklist_id, :user_id)
    end
end
