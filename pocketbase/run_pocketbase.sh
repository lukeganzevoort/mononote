cd "$(dirname "$0")" || exit 1

echo "Building PocketBase image..."
docker build --tag "pocketbase" .

echo "PocketBase will be running on http://localhost:8090"
echo "To stop the container, press Ctrl+C or run 'docker stop pocketbase-container' in another terminal."
echo "To access the PocketBase admin UI, visit http://localhost:8090/_/"

echo "Running PocketBase container..."
docker run \
  --rm \
  --name pocketbase-container \
  -p 8090:8090 \
  -v "$(pwd)/pb_data:/pb/pb_data" \
  pocketbase:latest
