class Api::RecordingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_recording

  
  def index
  render json: @recording.all
  end

  def create
    file = params[:file]
    # is trying trying to save the image to cloudinary
    if file
        begin
          # ext = File.extname(file.tempfile)
          puts 'Trying to save to cloudinary'
         recording = Cloudinary::Uploader.upload(file.tempfile,  secure: true, resource_type: :auto, :folder=>"vocal/audio")
         puts recording
        #  binding.pry
        rescue => e
          # binding.pry
          puts "error"
          puts e
          render json: { errors: e }, status: 422
          return
        end
      end
        if recording && recording['secure_url']
            @recording = current_user.recordings.new(
              title: params[:title], 
              mood: params[:mood], 
              notes: params[:notes], 
              length: recording['duration'],
              pointer: recording['secure_url']
            )
            @recording.pointer = recording['secure_url']
            if @recording.save
              render json: @recording
            else
              render json: { errors: @recording.errors}, status: 422
            end
        end 
end


  # def update
  #   if (@recording.update)
  #     render json: @recording
  #    else
  #     render json: { errors: @recording.errors }, status: :unprocessable_entity
  #    end 
  # end

  # def destroy
  #   render json: @recording.destroy
  # end

  private

   def set_recording
     @recording = current_user.recordings
   end

  def recording_params
    params.permit(:title, :notes, :mood)
  end

end
