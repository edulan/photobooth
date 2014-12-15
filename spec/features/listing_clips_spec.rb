require 'rails_helper'

feature "Listing clips", :type => :feature do
  scenario "shows all created clips" do
    visit clips_path

    expect(page).to have_xpath('.//ul//li', count: 3)
  end
end
