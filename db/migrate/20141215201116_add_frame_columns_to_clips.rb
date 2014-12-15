class AddFrameColumnsToClips < ActiveRecord::Migration
  def self.up
    add_attachment :clips, :frame
  end

  def self.down
    remove_attachment :clips, :frame
  end
end
