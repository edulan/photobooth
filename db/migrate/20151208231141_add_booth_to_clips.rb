class AddBoothToClips < ActiveRecord::Migration
  def change
    add_column :clips, :booth_id, :integer
  end
end
