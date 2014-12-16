require 'rails_helper'

feature "Listing clips", :type => :feature do

  background do
    create_list(:clip, 3)
  end

  scenario "shows all created clips" do
    visit clips_path

    expect(page).to have_css(".clip-group", count: 3)
  end
end
