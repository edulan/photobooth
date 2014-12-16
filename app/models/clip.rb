class Clip < ActiveRecord::Base
  has_attached_file :snapshot1,
    storage: :dropbox,
    dropbox_credentials: Rails.application.secrets.dropbox_credentials,
    dropbox_visibility: 'public',
    styles: { medium: "300x300>", thumb: "100x100>" },
    path: ":hash.:extension",
    default_url: ":style/missing.png",
    hash_secret: Rails.application.secrets.secret_key_base
  validates_attachment_content_type :snapshot1,
    content_type: /\Aimage\/.*\Z/

  has_attached_file :snapshot2,
    storage: :dropbox,
    dropbox_credentials: Rails.application.secrets.dropbox_credentials,
    dropbox_visibility: 'public',
    styles: { medium: "300x300>", thumb: "100x100>" },
    path: ":hash.:extension",
    default_url: ":style/missing.png",
    hash_secret: Rails.application.secrets.secret_key_base
  validates_attachment_content_type :snapshot2,
    content_type: /\Aimage\/.*\Z/

  has_attached_file :snapshot3,
    storage: :dropbox,
    dropbox_credentials: Rails.application.secrets.dropbox_credentials,
    dropbox_visibility: 'public',
    styles: { medium: "300x300>", thumb: "100x100>" },
    path: ":hash.:extension",
    default_url: ":style/missing.png",
    hash_secret: Rails.application.secrets.secret_key_base
  validates_attachment_content_type :snapshot3,
    content_type: /\Aimage\/.*\Z/

  has_attached_file :snapshot4,
    storage: :dropbox,
    dropbox_credentials: Rails.application.secrets.dropbox_credentials,
    dropbox_visibility: 'public',
    styles: { medium: "300x300>", thumb: "100x100>" },
    path: ":hash.:extension",
    default_url: ":style/missing.png",
    hash_secret: Rails.application.secrets.secret_key_base
  validates_attachment_content_type :snapshot4,
    content_type: /\Aimage\/.*\Z/

  process_in_background :snapshot1, processing_image_url: "thumb/processing.jpg"
  process_in_background :snapshot2, processing_image_url: "thumb/processing.jpg"
  process_in_background :snapshot3, processing_image_url: "thumb/processing.jpg"
  process_in_background :snapshot4, processing_image_url: "thumb/processing.jpg"

  def snapshots
    [snapshot1, snapshot2, snapshot3, snapshot4]
  end
end
