class CreateClips < ActiveRecord::Migration
  def change
    create_table :clips do |t|

      t.timestamps
    end
  end
end
