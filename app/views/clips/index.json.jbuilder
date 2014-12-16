json.array!(@clips) do |clip|
  json.extract! clip, :id
  json.snapshots clip.snapshots do |snapshot|
    json.medium_url snapshot.url(:medium)
    json.thumb_url snapshot.url(:thumb)
  end
  json.url clip_url(clip, format: :json)
end
