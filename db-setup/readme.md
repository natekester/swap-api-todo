## DB structure

to get psql
$ brew install postgresql

While you can easily set up your db management within your app - and control your table structure using built in tools
it's generally a good idea to decouple as much as possible as it's hard to know when your company may have a change
in direction and take a turn for "technology consolidation" which may require a change in db management tools

Understanding that you can always pull down a baseline later.

For now I'm going to just use straight sql because it's backend agnostic.
