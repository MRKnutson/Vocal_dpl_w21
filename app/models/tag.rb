class Tag < ApplicationRecord
  has_many :recording_tags, dependent: :destroy
end
