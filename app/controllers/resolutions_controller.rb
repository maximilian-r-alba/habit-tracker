class ResolutionsController < ApplicationController

    skip_before_action :authorize, only: :index

    def create
        resolution = Resolution.create!(resolution_params)
        render json: resolution, status: :created
    end

    def index
        render json: Resolution.all
    end


    private

    def resolution_params
        params.permit(:goal_statement, :category)
    end
end

