class CreateRecordingTags < ActiveRecord::Migration[6.1]
  def change
    create_table :recording_tags do |t|
      t.belongs_to :recording, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
