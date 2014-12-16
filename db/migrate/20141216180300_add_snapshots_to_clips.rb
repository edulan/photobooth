class AddSnapshotsToClips < ActiveRecord::Migration
  def self.up
    remove_attachment :clips, :frame

    add_attachment :clips, :snapshot1
    add_attachment :clips, :snapshot2
    add_attachment :clips, :snapshot3
    add_attachment :clips, :snapshot4
  end

  def self.down
    add_attachment :clips, :frame

    remove_attachment :clips, :snapshot1
    remove_attachment :clips, :snapshot2
    remove_attachment :clips, :snapshot3
    remove_attachment :clips, :snapshot4
  end
end
