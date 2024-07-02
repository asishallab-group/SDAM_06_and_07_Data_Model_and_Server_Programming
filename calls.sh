# Start server
# in another shell do
# node server.js

# Invoke 'hello world'
curl http://localhost:3000

# Sent get command to search cities:
curl -XGET --header "Content-Type: application/json" \
  --header "Accept: application/json" \
  --data '{"search_arg": {"descendants":[{"field":"name","op":"like","val":"B%"},{"field":"population","op":">=","val":"750000"}],"op":"AND"}}' http://localhost:3000/cities

# Sent get command to search cities and get the result in HTML:
curl -XGET --header "Content-Type: application/json" \
  --header "Accept: text/html" \
  --data '{"search_arg": {"descendants":[{"field":"name","op":"like","val":"B%"},{"field":"population","op":">=","val":"750000"}],"op":"AND"}}' http://localhost:3000/cities

# Sent get command to search cities and get the result in HTML, 
# while we do NOT provide ANY search argument:
curl -XGET --header "Accept: application/json" http://localhost:3000/cities
curl -XGET --header "Accept: text/html" http://localhost:3000/cities

# Sent post command to create a new city record:
curl -XPOST --header "Content-Type: application/json" \
  --data '{"city_ID":"MOS", "name":"Moskau", "population":13000000, "country_ID": "RU"}' http://localhost:3000/cities

# Sent post command to create a new city record:
curl -XPOST --header "Content-Type: application/json" \
  --data '{"city_ID":"MOS", "name":"Moskau", "population":13000000, "country_ID": "RU"}' http://localhost:3000/cities

# Sent put command to update a City record:
curl -XPUT --header "Content-Type: application/json" \
  --data '{"population":13000001}' http://localhost:3000/cities/MOS
