json.array!(@clips) do |clip|
  json.extract! clip, :id
  json.frame do
    json.medium_url clip.frame.url(:medium)
    json.thumb_url clip.frame.url(:thumb)
  end
  json.url clip_url(clip, format: :json)
end
