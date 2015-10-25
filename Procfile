web: bundle exec puma -t ${PUMA_MIN_THREADS:-2}:${PUMA_MAX_THREADS:-10} -w ${PUMA_WORKERS:-1} -p $PORT -e ${RACK_ENV:-development} --preload
worker: bundle exec sidekiq -e ${RACK_ENV:-development} -q paperclip -c 1
