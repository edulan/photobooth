require 'rails_helper'

feature "Create clip", type: :feature, js: true do

  context "whit no camera support" do
    background do
      #mock_camera(supported: false)
    end

    scenario "shows camera not supported message" do
      visit "#clips/new"

      expect(page).to have_content("Sorry, your browser does not support video stream API")
    end
  end
end
