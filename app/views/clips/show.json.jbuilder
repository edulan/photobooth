json.extract! @clip, :id, :created_at, :updated_at
json.snapshots @clip.snapshots do |snapshot|
    json.thumb_url snapshot.url(:thumb)
    json.medium_url snapshot.url(:medium)
end
