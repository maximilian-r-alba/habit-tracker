class PactsController < ApplicationController
    def create
        pact = @current_user.pacts.create!(pact_params)
        render json: pact, status: :created
    end

    def index
        render json: Pact.all
    end
    
    def update
        pact = Pact.find(params[:id])
        if pact.user[:id] == session[:user_id]
            pact.update!(pact_params)
            render json: pact
        end
    end

    def destroy
        pact = Pact.find(params[:id])
        if pact.user[:id] == session[:user_id]
            pact.destroy
            head :no_content
        end
        
    end
    private

    def pact_params
            return params.permit(:isSpecific, :resolution_id, :frequency_scope, :goal_int, :isSpecific)
    end
end
