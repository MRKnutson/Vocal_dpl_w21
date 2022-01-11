class Api::RecordingsController < ApplicationController
  # before_action :authenticate_user!
  # before_action :set_recording, only: [:show, :update, :destroy]

  
  def index
  render json: Recording.all
  end

  # private

  # def set_recording
  #   @recording=Recording.find(params[:id])
  # end

  # def recording_params
  #   params.require(:recording).permit(:title, :pointer)
  # end

end
