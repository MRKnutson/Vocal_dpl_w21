class Api::TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_tags

  
  def index
  render json: @tag.all
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

  private

  def set_tags
    @tag = current_user.tags
  end
end
