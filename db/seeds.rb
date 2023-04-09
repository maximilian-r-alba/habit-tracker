# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(username:"spazzyCat", password: "abcd1234", password_confirmation: "abcd1234", name:"Fig", image_url: "http://clipart-library.com/img1/1108294.jpg", bio:"")
User.create!(username:"upDog", password: "abcd1234", password_confirmation: "abcd1234", name: "Fido", image_url: "http://clipart-library.com/img1/1459326.png", bio:"" )


15.times{User.create!(username:Faker::Internet.username, password: "abcd1234", password_confirmation: "abcd1234", name: Faker::Name.first_name, image_url:[ "http://clipart-library.com/img1/1108294.jpg", "http://clipart-library.com/img1/1459326.png"].sample , bio:"")}


Resolution.create!(goal_statement: "Read More Books", category: "Mental")
Resolution.create!(goal_statement: "Practice Guitar", category: "Mental")
Resolution.create!(goal_statement: "Practice a New Recipe", category: "Mental")
Resolution.create!(goal_statement: "Go to the Gym", category: "Physical")
Resolution.create!(goal_statement: "Stretch", category: "Physical")
Resolution.create!(goal_statement: "Eat Vegetables with a Meal", category: "Physical")
Resolution.create!(goal_statement: "Spend Time with Friends", category: "Social")
Resolution.create!(goal_statement: "Call a Family Member", category: "Social")
Resolution.create!(goal_statement: "Visit Parents", category: "Social")

User.all.each{|user| 4.times{user.pacts.create!(isSpecific: true, goal_int: rand(1..10), resolution_id: Resolution.all.sample.id)}}

User.all.each{|user| 4.times{user.pacts.create!(isSpecific: false, goal_int: rand(1..10), resolution_id: Resolution.all.sample.id, frequency_scope: ["Daily", "Weekly", "Monthly"].sample)}}
