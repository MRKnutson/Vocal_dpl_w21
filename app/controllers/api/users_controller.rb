class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.all
  end

  def show 
    render json: @user
  end

  def create
    @user=User.new(user_params)
    if(@user.save)
      render json: @user
    else
      render json: {errors: @user.errors}, status: :unprocessable_entity
    end
  end

def update
  if (current_user.update(user_params))
    render json: current_user
  else
    render json: {errors: @user.errors}, status: :unprocessable_entity
  end
end

def destroy
  render json: @user.destroy
end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
