class Clip < ActiveRecord::Base
  has_attached_file :snapshot1,
    styles: { medium: "300x300>", thumb: "100x100>" },
    default_url: ":style/missing.png"
  validates_attachment_content_type :snapshot1,
    content_type: /\Aimage\/.*\Z/

  has_attached_file :snapshot2,
    styles: { medium: "300x300>", thumb: "100x100>" },
    default_url: ":style/missing.png"
  validates_attachment_content_type :snapshot2,
    content_type: /\Aimage\/.*\Z/

  has_attached_file :snapshot3,
    styles: { medium: "300x300>", thumb: "100x100>" },
    default_url: ":style/missing.png"
  validates_attachment_content_type :snapshot3,
    content_type: /\Aimage\/.*\Z/

  has_attached_file :snapshot4,
    styles: { medium: "300x300>", thumb: "100x100>" },
    default_url: ":style/missing.png"
  validates_attachment_content_type :snapshot4,
    content_type: /\Aimage\/.*\Z/

  def snapshots
    [snapshot1, snapshot2, snapshot3, snapshot4]
  end
end
