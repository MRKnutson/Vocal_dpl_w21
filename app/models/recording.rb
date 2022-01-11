class Recording < ApplicationRecord
  belongs_to :user
  has_many :tags, through: :recording_tags, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :moods, dependent: :destroy
end
