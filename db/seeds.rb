# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

u1 = User.create(email:"test@test.com", password: 123456)

5.times do
  rec = Recording.create(
    title: "a title", 
      pointer: "This is a test URL",
      user_id: u1.id
  )
  thisTag = Tag.create(
    text: "This is a tag"
    )
  RecordingTag.create(
    recording_id: rec.id,
    tag_id: thisTag.id
    )
    Mood.create(
      value: rand(1..5),
      recording_id: rec.id
    )
end

5.times do
  user = User.create(
    first_name:Faker::Name.first_name,
    last_name:Faker::Name.last_name,
    email:Faker::Internet.unique.email, 
    password: Faker::Internet.password(min_length: 6),
  )
    3.times do 
    rec = Recording.create(
      title: "#{user.first_name} and a title", 
      pointer: "This is a test URL",
      user_id: user.id
    )
    thisTag = Tag.create(
      text: "This is a tag"
      )
    RecordingTag.create(
      recording_id: rec.id,
      tag_id: thisTag.id
      )
      Mood.create(
        value: rand(1..5),
        recording_id: rec.id
      )
      2.times do 
        Comment.create(
        text: "This is a comment",
        recording_id: rec.id
      )
    end
      2.times do 
        Photo.create(
        pointer: "random",
        recording_id: rec.id
      )
      end
  end
end

puts "seeded complete"
