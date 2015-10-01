if Rails.env.production?
  Paperclip::Attachment.default_options[:path] = "uploads/:id_partition/:hash.:extension"
  Paperclip::Attachment.default_options[:url] = "uploads/:id_partition/:hash.:extension"
  Paperclip::Attachment.default_options[:use_timestamp] = false
  Paperclip::Attachment.default_options[:storage] = :s3
  Paperclip::Attachment.default_options[:bucket] = ENV["S3_BUCKET"]
  Paperclip::Attachment.default_options[:s3_host_name] = "s3-eu-west-1.amazonaws.com"
  Paperclip::Attachment.default_options[:s3_protocol] = ""
  Paperclip::Attachment.default_options[:s3_storage_class] = :reduced_redundancy
  Paperclip::Attachment.default_options[:s3_credentials] = {
    access_key_id: ENV["S3_ACCESS_KEY_ID"],
    secret_access_key: ENV["S3_SECRET_ACCESS_KEY"]
  }
else
  Paperclip::Attachment.default_options[:path] = ":rails_root/public/uploads/:id_partition/:hash.:extension"
  Paperclip::Attachment.default_options[:url] = "uploads/:id_partition/:hash.:extension"
  Paperclip::Attachment.default_options[:use_timestamp] = false
end
