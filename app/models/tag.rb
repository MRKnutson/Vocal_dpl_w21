class Tag < ApplicationRecord
  has_many :recording_tags, dependent: :destroy
  has_many :recordings, through: :recording_tags
end
