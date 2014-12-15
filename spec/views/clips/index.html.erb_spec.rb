require 'rails_helper'

RSpec.describe "clips/index", :type => :view do
  before(:each) do
    assign(:clips, [
      Clip.create!(),
      Clip.create!()
    ])
  end

  it "renders a list of clips" do
    render
  end
end
