# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_03_30_234921) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "pacts", force: :cascade do |t|
    t.string "completion_date"
    t.boolean "isSpecific"
    t.integer "goal_int"
    t.string "frequency_scope"
    t.bigint "resolution_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["resolution_id"], name: "index_pacts_on_resolution_id"
    t.index ["user_id"], name: "index_pacts_on_user_id"
  end

  create_table "progress_dates", force: :cascade do |t|
    t.bigint "pact_id", null: false
    t.bigint "resolution_id", null: false
    t.string "progressDate"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["pact_id"], name: "index_progress_dates_on_pact_id"
    t.index ["resolution_id"], name: "index_progress_dates_on_resolution_id"
  end

  create_table "resolutions", force: :cascade do |t|
    t.string "goal_statement"
    t.string "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "name"
    t.string "bio"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "pacts", "resolutions"
  add_foreign_key "pacts", "users"
  add_foreign_key "progress_dates", "pacts"
  add_foreign_key "progress_dates", "resolutions"
end
