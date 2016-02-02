# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

tasks = Task.create([
            {title: "Pick up the delivery", description: "don't mess this up"},
            {title: "Favor for uncle Bob", description: "Give Bob a ride to Bingo night"},
            {title: "Collect an envelop from Tony", description: "Don´t forget to say hi to our mutual friend at the bakery"},
            {title: "Call Lionel Richy", description: "Tell him you are not looking for him and ask to speak to his wife"},
          ])
