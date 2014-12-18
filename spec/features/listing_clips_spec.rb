require 'rails_helper'

feature "Listing clips", type: :feature, js: true do
  context "with at least one clip" do
    background do
      create_list(:clip, 3, votes: 10)
    end

    scenario "shows all created clips" do
      visit "#clips"

      expect(page).to have_css(".clip-group", count: 3)
    end

    scenario "shows clip votes" do
      visit "#clips"

      expect(page).to have_content("10", count: 3)
    end
  end

  context "with no clips" do
    scenario "shows no clips found message" do
      visit "#clips"

      expect(page).to have_content("No clips found")
    end
  end
end
