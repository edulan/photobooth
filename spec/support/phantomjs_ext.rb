RSpec.configure do |config|
  config.before(:each, type: :feature) do
    page.driver.browser.extensions = [
      File.expand_path("../phantomjs_ext/disable_getUserMedia.js", __FILE__)
    ]
  end

  config.before(:each, get_user_media: true) do
    page.driver.browser.extensions = [
      File.expand_path("../phantomjs_ext/getUserMedia.js", __FILE__)
    ]
  end
end