class CreateBooths < ActiveRecord::Migration
  def change
    create_table :booths do |t|
      t.string :token
      t.string :name

      t.timestamps
    end
  end
end
