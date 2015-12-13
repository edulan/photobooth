class AddBoothRefToClips < ActiveRecord::Migration
  def change
    add_reference :clips, :booth, index: true
  end
end
