class AddMoodToRecordings < ActiveRecord::Migration[6.1]
  def change
    add_column :recordings, :mood, :integer
  end
end
