class RemoveNoteFromRecordings < ActiveRecord::Migration[6.1]
  def change
    remove_column :recordings, :note, :integer
  end
end
