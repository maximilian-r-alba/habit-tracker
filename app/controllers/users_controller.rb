class UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def index
        render json:User.all
    end

    def show
        user = User.find_by(id:session[:user_id])
        if user
        render json: user, include: ['pacts', 'pacts.resolution']
        else
            render json: {error: "Not authorized"}, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id:params[:id])
        byebug
        if user
            user.update(user_params)
            render json:user
        else
            render json: {error: "User not found"}, status: :not_found
        end
    end

    def destroy 
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :password, :name, :bio, :image_url)
    end
end
