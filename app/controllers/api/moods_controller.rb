class Api::MoodsController < ApplicationController
  def index
    render json: Mood.all
  end
end
