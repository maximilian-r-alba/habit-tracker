class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :index]
    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def index
        users = User.all
        render json:users, include: ['pacts', 'pacts.resolution', 'pacts.progress_dates', 'resolutions']
    end

    def show
        user = User.find_by(id:session[:user_id])
        if user
        render json: user, include: ['pacts', 'pacts.resolution', 'pacts.progress_dates', 'resolutions']
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id:session[:user_id])
        if user
            user.update!(user_params)
            render json:user, include: ['pacts', 'pacts.resolution', 'pacts.progress_dates', 'resolutions']
        else
            render json: {errors:[ "User not found"]}, status: :not_found
        end
    end

    def destroy 
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :name, :bio, :image_url, :password_confirmation)
    end
end
