class Api::TagsController < ApplicationController
  before_action :authenticate_user!
  # before_action :set_tag

  # "current_user" might make this act wierd so check once we get here but working for now
  def index
    id = current_user.id
    render json: RecordingTag.get_recordings_through_tags(id)
  end

  def create
    @tag = Tag.new(tag_params)
    rTag = @tag.recording_tags.new(recording_id: params[:recording_id])
      if @tag.save and rTag.save
        render json: @tag
      else
          render json: {error: @tag.errors}, status: 422
      end
  end
  
  def update
    @tag = Tag.find(params[:id])
    rTag =  @tag.recording_tags.new(recording_id: params[:recording_id])
    if rTag.save
      render json: @tag
    else
        render json: {error: @tag.errors}, status: 422
    end
  end
  # def update
  #   if (@tag.update)
  #     render json: @tag
  #    else
  #     render json: { errors: @tag.errors }, status: :unprocessable_entity
  #    end 
  # end

  # def destroy
  #   render json: @tag.destroy
  # end

  # private

  # def set_tag
  #   @tag = current_user.tags
  # end

  # def set_Rtag
  # @Rtag = current_user.
  # end
  def tag_params
    params.require(:tag).permit(:text)
  end
end
