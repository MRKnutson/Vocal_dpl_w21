class AddNotesToRecordings < ActiveRecord::Migration[6.1]
  def change
    add_column :recordings, :notes, :text
  end
end
