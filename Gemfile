ruby '2.2.1'
source 'https://rubygems.org'
source 'https://rails-assets.org'

# ENV configuration
gem 'dotenv-rails', groups: [:development, :test]
gem 'conf_conf'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.8'
gem 'rails_12factor', group: :production
# Use sqlite3 as the database for Active Record
gem 'sqlite3', group: [:development, :test]
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'
gem 'bootstrap-sass', '~> 3.2.0'
gem 'bootswatch-rails'
gem 'autoprefixer-rails'
gem 'font-awesome-rails'
# Use Uglifier as compressor for JavaScript assets
gem 'browserify-rails', '~> 1.1.0'
gem 'uglifier', '>= 1.3.0'
gem 'ejs'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring', group: :development
gem 'puma'
# Uploads
gem "paperclip", "~> 4.2"
gem "aws-sdk"
# gem "paperclip-dropbox", ">= 1.1.7"
gem "delayed_paperclip"
gem 'posix-spawn' # see http://adamniedzielski.github.io/blog/2014/02/05/fighting-paperclip-errno-enomem-error/
# Background processing
gem 'sidekiq'
# JavaScript assets
gem 'rails-assets-underscore', '1.6.0'
gem 'rails-assets-backbone', '1.1.2'
gem 'rails-assets-backbone.marionette', '2.2.1'

gem 'rspec-rails', '~> 3.0', group: [:development, :test]

group :test do
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'poltergeist'
  gem 'factory_girl_rails'
  gem 'database_cleaner'
end

group :development do
  gem 'byebug'
end
