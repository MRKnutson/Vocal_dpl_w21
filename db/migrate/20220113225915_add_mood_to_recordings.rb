class AddMoodToRecordings < ActiveRecord::Migration[6.1]
  def change
    add_column :recordings, :note, :integer
    add_column :recordings, :length, :float
  end
end
