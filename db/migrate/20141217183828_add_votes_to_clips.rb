class AddVotesToClips < ActiveRecord::Migration
  def change
    add_column :clips, :votes, :integer, default: 0
  end
end
