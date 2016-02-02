json.array!(@tasks) do |task|
  json.extract! task, :id, :title, :description, :date_completed
  json.url task_url(task, format: :json)
end
