# Start server
# in another shell do
# node server.js

# Invoke 'hello world'
curl http://localhost:3000

# Sent get command
curl -XGET --header "Content-Type: application/json" \
  --data '{"descendants":[{"field":"name","op":"like","val":"B%"},{"field":"population","op":">=","val":"750000"}],"op":"AND"}' http://localhost:3000/cities
