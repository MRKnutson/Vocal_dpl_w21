class Api::TagsController < ApplicationController
  # before_action :authenticate_user!
  # before_action :set_tag

  # "current_user" might make this act wierd so check once we get here
  def index
    puts 'tags index hit'
    render json: RecordingTag.get_recordings
  end

  # def update
  #   if (@tag.update)
  #     render json: @tag
  #    else
  #     render json: { errors: @tag.errors }, status: :unprocessable_entity
  #    end 
  # end

  def destroy
    render json: @tag.destroy
  end

  # private

  # def set_tag
  #   @tag = current_user.tags
  # end
end
