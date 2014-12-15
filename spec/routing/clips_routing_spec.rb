require "rails_helper"

RSpec.describe ClipsController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/clips").to route_to("clips#index")
    end

    it "routes to #new" do
      expect(:get => "/clips/new").to route_to("clips#new")
    end

    it "routes to #show" do
      expect(:get => "/clips/1").to route_to("clips#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/clips/1/edit").to route_to("clips#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/clips").to route_to("clips#create")
    end

    it "routes to #update" do
      expect(:put => "/clips/1").to route_to("clips#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/clips/1").to route_to("clips#destroy", :id => "1")
    end

  end
end
