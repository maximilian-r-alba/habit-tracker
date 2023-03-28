class ResolutionsController < ApplicationController

    skip_before_action :authorize, only: :index

    def create
        resolution = Resolution.create!(resolution_params)
        render json: resolution, status: :created
    end

    def index
        render json: Resolution.all
    end

    def show
        resolution = Resolution.find(params[:id])
        render json: resolution
    end

    def update
        resolution = Resolution.find_by(id:params[:id])
        if resolution.update(resolution_params)
        render json:resolution
        else
            byebug
        end
    end

    def destroy
        resolution = Resolution.find(params[:id])
        resolution.destroy
        head :no_content
    end

    private

    def resolution_params
        params.permit(:goal_statement, :category)
    end
end
