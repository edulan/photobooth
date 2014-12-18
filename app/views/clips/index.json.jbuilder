json.array!(@clips) do |clip|
  json.partial! 'clips/clip', clip: clip
  json.url clip_url(clip, format: :json)
end
