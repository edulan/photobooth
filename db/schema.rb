# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141217175923) do

  create_table "clips", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "snapshot1_file_name"
    t.string   "snapshot1_content_type"
    t.integer  "snapshot1_file_size"
    t.datetime "snapshot1_updated_at"
    t.string   "snapshot2_file_name"
    t.string   "snapshot2_content_type"
    t.integer  "snapshot2_file_size"
    t.datetime "snapshot2_updated_at"
    t.string   "snapshot3_file_name"
    t.string   "snapshot3_content_type"
    t.integer  "snapshot3_file_size"
    t.datetime "snapshot3_updated_at"
    t.string   "snapshot4_file_name"
    t.string   "snapshot4_content_type"
    t.integer  "snapshot4_file_size"
    t.datetime "snapshot4_updated_at"
    t.boolean  "snapshot1_processing"
    t.boolean  "snapshot2_processing"
    t.boolean  "snapshot3_processing"
    t.boolean  "snapshot4_processing"
  end

end
