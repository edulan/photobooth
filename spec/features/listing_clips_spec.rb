require 'rails_helper'

feature "Listing clips", type: :feature, js: true do

  background do
    create_list(:clip, 3)
  end

  scenario "shows all created clips" do
    visit "#hall"

    expect(page).to have_css(".clip-group", count: 3)
  end
end
