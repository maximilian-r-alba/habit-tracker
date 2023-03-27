class UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def index
        render json:User.all
    end

    def show
        user = User.find(params[:id])
        render json: user
    end

    def update
        user = User.find_by(id:params[:id])
        if user.update(user_params)
        render json:user
        else
            byebug
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
