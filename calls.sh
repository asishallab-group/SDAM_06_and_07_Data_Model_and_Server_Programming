# Start server
# in another shell do
# node server.js

# Invoke 'hello world'
curl http://localhost:3000

# Sent get command to search cities:
curl -XGET --header "Content-Type: application/json" \
  --data '{"descendants":[{"field":"name","op":"like","val":"B%"},{"field":"population","op":">=","val":"750000"}],"op":"AND"}' http://localhost:3000/cities

# Sent post command to create a new city record:
curl -XPOST --header "Content-Type: application/json" \
  --data '{"city_ID":"MOS", "name":"Moskau", "population":13000000, "country_ID": "RU"}' http://localhost:3000/cities

# Sent put command to update a City record:
curl -XPUT --header "Content-Type: application/json" \
  --data '{"population":13000001}' http://localhost:3000/cities/MOS
