class Api::RecordingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_recording

  
  def index
  render json: @recording.all
  end

  def update
    if (@recording.update)
      render json: @recording
     else
      render json: { errors: @recording.errors }, status: :unprocessable_entity
     end 
  end

  def destroy
    render json: @recording.destroy
  end

  private

  def set_recording
    @recording = current_user.recordings
  end

  # def recording_params
  #   params.require(:recording).permit(:title, :pointer)
  # end

end
