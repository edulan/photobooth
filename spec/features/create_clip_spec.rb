require 'rails_helper'

feature "Create clip", type: :feature, js: true do
  context "with no camera support" do
    scenario "shows camera not supported message" do
      visit "#clips/new"

      expect(page).to have_content("Sorry, your browser does not support video stream API")
    end

    scenario "disables start button" do
      visit "#clips/new"

      expect(page).to have_css(".btn-start[disabled]")
    end
  end

  context "with camera support" do
    scenario "shows welcome message", get_user_media: true do
      visit "#clips/new"

      expect(page).to have_content("Take your time to make a good impression. When you're ready click start button")
    end
  end
end
