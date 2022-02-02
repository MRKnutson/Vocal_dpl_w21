class Recording < ApplicationRecord
  belongs_to :user
  has_many :recording_tags, dependent: :destroy
  has_many :tags, through: :recording_tags
  has_many :photos, dependent: :destroy

  # SELECT users.id AS user_id, recordings.id AS recording_id, photos.id AS photo_id, photos.pointer FROM recordings
  # INNER JOIN users
  # ON users.id = recordings.user_id
  # INNER JOIN photos
  # ON photos.recording_id = recordings.id
  # WHERE users.id = 2
  def self.photo_index(user_id)
    select("users.id AS user_id, recordings.id AS recording_id, photos.id AS photo_id, photos.pointer")
      .joins("INNER JOIN users ON users.id = recordings.user_id")
      .joins("INNER JOIN photos ON photos.recording_id = recordings.id")
      .where("users.id = #{user_id}")
  end

  def self.ordered
    select("*")
      .order("created_at")
  end
end
