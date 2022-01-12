class RecordingTag < ApplicationRecord
  belongs_to :recording
  belongs_to :tag
  puts "recording tag hit"

  # this gives back {tag_id, recording_id, tag_text, pointer }
  def self.get_recordings
    select('tags.id AS tag_id, recording_id, text AS tag_text, pointer')
    .joins('JOIN tags ON tags.id = recording_tags.tag_id')
    .joins('JOIN recordings ON recordings.id = recording_tags.recording_id')
  end
end
