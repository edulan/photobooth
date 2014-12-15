require 'rails_helper'

RSpec.describe "clips/edit", :type => :view do
  before(:each) do
    @clip = assign(:clip, Clip.create!())
  end

  it "renders the edit clip form" do
    render

    assert_select "form[action=?][method=?]", clip_path(@clip), "post" do
    end
  end
end
