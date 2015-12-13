if Rails.env.production?
  options = {
    path: 'uploads/:id_partition/:hash.:extension',
    url: 'uploads/:id_partition/:hash.:extension',
    use_timestamp: false,
    storage: :s3,
    bucket: ENV['S3_BUCKET'],
    s3_host_name: 's3-eu-west-1.amazonaws.com',
    s3_protocol: '',
    s3_storage_class: :reduced_redundancy,
    s3_credentials: {
      access_key_id: ENV['S3_ACCESS_KEY_ID'],
      secret_access_key: ENV['S3_SECRET_ACCESS_KEY']
    }
  }
else
  options = {
    path: ':rails_root/public/uploads/:id_partition/:hash.:extension',
    url: '/uploads/:id_partition/:hash.:extension',
    use_timestamp: false
  }
end

Paperclip::Attachment.default_options.merge!(options)
