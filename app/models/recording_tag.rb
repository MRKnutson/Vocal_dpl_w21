class RecordingTag < ApplicationRecord
  belongs_to :recording
  belongs_to :tag
end
