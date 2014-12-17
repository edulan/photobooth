class AddSnapshotsProcessingToClips < ActiveRecord::Migration
  def self.up
    add_column :clips, :snapshot1_processing, :boolean
    add_column :clips, :snapshot2_processing, :boolean
    add_column :clips, :snapshot3_processing, :boolean
    add_column :clips, :snapshot4_processing, :boolean
  end

  def self.down
    remove_column :clips, :snapshot1_processing
    remove_column :clips, :snapshot2_processing
    remove_column :clips, :snapshot3_processing
    remove_column :clips, :snapshot4_processing
  end
end
