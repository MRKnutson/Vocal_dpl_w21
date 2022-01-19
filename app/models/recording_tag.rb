class RecordingTag < ApplicationRecord
  belongs_to :recording
  belongs_to :tag

  # this gives back {tag_id, recording_id, tag_text, pointer }
  def self.get_recordings_through_tags (id)
    select('tags.id AS tag_id, recording_id, text AS tag_text, title, pointer, users.id AS user_id')
    .joins('JOIN tags ON tags.id = recording_tags.tag_id')
    .joins('JOIN recordings ON recordings.id = recording_tags.recording_id')
    .joins('JOIN users ON users.id = recordings.user_id')
    .where("users.id = #{id}")
  end
end
