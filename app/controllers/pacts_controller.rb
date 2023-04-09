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
        byebug
        pact = User.find(session[:user_id]).pacts.find(params[:id])
        pact.destroy
        head :no_content
    end
    private

    def pact_params
        
        if(params[:isSpecific])
            return params.permit(:resolution_id, :goal_int, :isSpecific)
        else
            return params.permit(:isSpecific, :resolution_id, :frequency_scope, :goal_int)
        end
    end
end
