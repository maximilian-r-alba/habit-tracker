class PactsController < ApplicationController
    def create
        pact = @current_user.pacts.create!(pact_params)
        render json: pact, status: :created
    end

    def index
        render json: Pact.all
    end
    
    private

    def pact_params
        pact_parameters = params.permit(:specific?, :resolution_id, :frequency_scope, :goal_int)
    end
end
