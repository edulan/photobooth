ruby '2.2.3'

source 'https://rubygems.org' do
  # ENV configuration
  gem 'dotenv-rails', groups: [:development, :test]
  gem 'conf_conf'
  # Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
  gem 'rails', '4.1.8'
  gem 'rails_12factor', group: :production
  gem 'pg'
  # Use SCSS for stylesheets
  gem 'sass-rails', '~> 4.0.3'
  gem 'bootstrap-sass', '~> 3.2.0'
  gem 'bootswatch-rails'
  gem 'autoprefixer-rails'
  gem 'font-awesome-rails'
  gem 'browserify-rails', '~> 1.1.0'
  gem 'uglifier', '>= 1.3.0'
  gem 'ejs'
  # Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
  gem 'jbuilder', '~> 2.0'
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', '~> 0.4.0', group: :doc
  gem 'puma'
  # Uploads
  gem 'paperclip', '~> 4.2'
  gem 'aws-sdk', '< 2.0'
  gem 'posix-spawn' # see http://adamniedzielski.github.io/blog/2014/02/05/fighting-paperclip-errno-enomem-error/
  # Background processing
  gem 'sidekiq'
  gem 'sinatra', require: nil
  # Test framework
  gem 'rspec-rails', '~> 3.0', groups: [:development, :test]

  group :test do
    gem 'capybara'
    gem 'capybara-screenshot'
    gem 'poltergeist'
    gem 'database_cleaner'
    gem 'factory_girl_rails'
  end

  group :development do
    gem 'byebug'
    gem 'spring'
    gem 'foreman'
    gem 'sqlite3'
  end
end

# JavaScript assets
source 'https://rails-assets.org' do
  gem 'rails-assets-underscore', '1.6.0'
  gem 'rails-assets-backbone', '1.1.2'
  gem 'rails-assets-backbone.marionette', '2.4.4'
end
