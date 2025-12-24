# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Content.destroy_all

Content.create!(
  title: "Technology and Modern Life",
  description: "An analytical article on how technology affects society and everyday living.",
  text: <<~TEXT
    Over the past few decades, technology has become an inseparable part of human life.
    From mobile phones and the internet to artificial intelligence, these innovations
    have transformed the way people communicate, work, and live on a daily basis.

    In the past, communication relied heavily on letters or landline telephones.
    Today, messages can be sent instantly, video calls can be made across continents,
    and online meetings have become a normal part of professional life.
    These changes have reduced the limitations of time and distance, making the world
    feel smaller and more connected than ever before.

    Despite these advantages, digital communication also presents several challenges.
    Face-to-face interaction is becoming less common, which may affect social skills
    and emotional connections. In addition, concerns about privacy and personal data
    security continue to grow as more information is shared online.

    Technology has also significantly changed the nature of work.
    Remote work has become increasingly popular, allowing people to work from home
    or from any location with an internet connection.
    Digital tools help improve efficiency and collaboration, but they also require
    workers to constantly adapt and learn new skills.

    At the same time, automation and artificial intelligence have raised concerns
    about job security. Some professions may disappear or change dramatically,
    forcing individuals to prepare for lifelong learning and career flexibility.

    Beyond work and communication, technology strongly influences society and culture.
    Social media platforms shape opinions, values, and behavior.
    Information spreads rapidly, which can be beneficial for education and awareness,
    but also dangerous when misinformation is involved.

    For this reason, media literacy and critical thinking have become essential skills
    in the modern world. People must learn how to evaluate information carefully
    and use technology responsibly.

    In conclusion, technology itself is neither good nor bad.
    Its impact depends on how it is used.
    When applied thoughtfully and ethically, technology can be a powerful force
    for positive change and social progress.
  TEXT
)

puts "Seeded #{Content.count} content record(s)"
