require 'rails_helper'

RSpec.describe Clip, :type => :model do
  processing_image_url = "assets/thumb/processing.png"

  context "processing snapshots" do
    it "sets custom image" do
      clip = build(:clip_with_snapshots)

      clip.save

      expect(clip.snapshot1.url(:thumb)).to be_eql(processing_image_url)
    end
  end
end
