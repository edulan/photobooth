Paperclip::Attachment.default_options[:storage] = :dropbox
Paperclip::Attachment.default_options[:dropbox_visibility] = "public"
Paperclip::Attachment.default_options[:dropbox_credentials] = {
  app_key: ENV["DROPBOX_APP_KEY"],
  app_secret: ENV["DROPBOX_APP_SECRET"],
  access_token: ENV["DROPBOX_ACCESS_TOKEN"],
  access_token_secret: ENV["DROPBOX_ACCESS_TOKEN_SECRET"],
  user_id: ENV["DROPBOX_USER_ID"]
}