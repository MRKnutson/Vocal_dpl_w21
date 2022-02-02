# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "faker"

# u1 = User.create(email:"test@test.com", password: 123456)
recordings = ["https://res.cloudinary.com/djhlv2nfc/video/upload/v1643821441/vocal/audio/uveiya31jjuqqtmquedh.webm", "https://res.cloudinary.com/djhlv2nfc/video/upload/v1643671692/vocal/audio/mr8a3yrqsb5wcadhz2yo.webm", "https://res.cloudinary.com/djhlv2nfc/video/upload/v1643414986/vocal/audio/wwqbf9gi9bay2iwia391.webm"]

200.times do
  rec = Recording.create(
    title: Faker::Hipster.sentence(word_count: rand(2..5)),
    pointer: recordings.sample,
    notes: Faker::Lorem.paragraph(sentence_count: rand(2..4), supplemental: true),
    mood: rand(1..5),
    user_id: 1,
    duration: Faker::Number.within(range: 1.0..304.0),
    created_at: Faker::Time.between(from: DateTime.now - 31, to: DateTime.now + 205),
  )
  # thisTag = Tag.create(
  #   text: "This is a tag"
  #   )
  # RecordingTag.create(
  #   recording_id: rec.id,
  #   tag_id: thisTag.id
  #   )
end

# 5.times do
#   user = User.create(
#     first_name:Faker::Name.first_name,
#     last_name:Faker::Name.last_name,
#     email:Faker::Internet.unique.email,
#     password: Faker::Internet.password(min_length: 6),
#   )
#     3.times do
#     rec = Recording.create(
#       title: "#{user.first_name} and a title",
#       pointer: "This is a test URL",
#       notes: "this is a test note",
#       mood: rand(1..5),
#       user_id: user.id
#     )
#     thisTag = Tag.create(
#       text: "This is a tag"
#       )
#     RecordingTag.create(
#       recording_id: rec.id,
#       tag_id: thisTag.id
#       )
#       2.times do
#         Photo.create(
#         pointer: "random",
#         recording_id: rec.id
#       )
#       end
#     end
# end

puts "seeded complete"
