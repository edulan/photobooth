class Clip < ActiveRecord::Base
  has_attached_file :frame,
    styles: { medium: "300x300>", thumb: "100x100>" },
    default_url: ":style/missing.png"
  validates_attachment_content_type :frame,
    content_type: /\Aimage\/.*\Z/
end
