class Api::RecordingsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_recording
  before_action :set_image_path, only: [:recording_image]
  before_action :set_image, only: [:destroy_image]

  
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
              duration: recording['duration'],
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

  def destroy
    render json: @recording.find(params[:id]).destroy
  end

  def recording_image 
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
        @image = @image_path.photos.new(
          pointer: cloud_image['secure_url']
        )
        @image.pointer = cloud_image['secure_url']
    end
  
    if @image.save
        render json: @image
    else
        render json: {errors: e}, status: 422
    end
  
  end
  
  def get_images
    render json: Recording.photo_index(current_user.id)
  end

  def destroy_image
    render json: @photo.destroy
  end

  private

   def set_recording
     @recording = current_user.recordings
   end

   def set_image_path
    @image_path = current_user.recordings.find(params[:recording_id])
  end

  def recording_params
    params.permit(:title, :notes, :mood)
  end

  def set_image
    recording = current_user.recordings.find(params[:recording_id])
    @photo = recording.photos.find(params[:photo_id])
  end

end
