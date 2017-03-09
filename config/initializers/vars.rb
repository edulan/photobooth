PHOTOBOOTH_VARS = {
  countdown_seconds: ENV['PHOTOBOOTH_COUNTDOWN_SECONDS'].to_i,
  features: {
    live_streaming: ENV['PHOTOBOOTH_LIVE_STREAMING'] === 'true'
  }
}
