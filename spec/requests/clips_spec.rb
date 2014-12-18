require 'rails_helper'

RSpec.describe "Clips", :type => :request do
  describe "GET /clips" do
    it "returns ok status" do
      get clips_path, format: :json

      expect(response).to have_http_status(200)
    end
  end
end
