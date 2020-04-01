# frozen_string_literal: true

namespace :assets do
  task :clean do
    # Usually there's an assets clean task
  end
end

# See https://github.com/heroku/heroku-buildpack-ruby/issues/792
Rake::Task['assets:clean'].enhance do
  FileUtils.remove_dir('node_modules', true)
  FileUtils.remove_dir('target', true)
end
