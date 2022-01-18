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
  render json: current_user.destroy
end

def profile_image 
  file = params[:file]

  if file
      begin 
          puts "saving to cloudinary"
          cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto, :folder=>"Vocal/Images")
      rescue => e
          puts 'An error occurred uploading to cloudinary. Check that uploaded file is FormData'
          p e 
          render json: {errors: e}, status: 422
          return
      end
  end

  if cloud_image && cloud_image['secure_url']
      current_user.image = cloud_image['secure_url']
  end

  if current_user.save
      render json: current_user
  else
      render json: {errors: e}, status: 422
  end

end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def set_user
    @user = User.find(params[:id])
  end

end
