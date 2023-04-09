class ProgressDatesController < ApplicationController

    def create
        date = ProgressDate.create!(progress_date_params)
        render json: date , status: :created
    end


    private
    def progress_date_params
        params.permit(:resolution_id, :pact_id, :progressDate)
    end
end
