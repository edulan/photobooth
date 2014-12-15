require 'rails_helper'

RSpec.describe "clips/new", :type => :view do
  before(:each) do
    assign(:clip, Clip.new())
  end

  it "renders new clip form" do
    render

    assert_select "form[action=?][method=?]", clips_path, "post" do
    end
  end
end
