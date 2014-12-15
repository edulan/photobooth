require 'rails_helper'

RSpec.describe "clips/show", :type => :view do
  before(:each) do
    @clip = assign(:clip, Clip.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end
