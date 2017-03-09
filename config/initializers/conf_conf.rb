$configuration = ConfConf.configuration do
  config :redis_provider
  config :s3_bucket
  config :s3_access_key_id
  config :s3_secret_access_key
  config :photobooth_countdown_seconds
end
