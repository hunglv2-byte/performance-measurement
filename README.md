# Run k6
` bash ./run.sh `

# Run generate data
`` node generate_data.js ``

# Run SQL in docker
` docker cp consumer.natural_persons.sql record-postgres15.12:/consumer.natural_persons.sql && docker exec -it record-postgres15.12 psql -U justincase -d record_db -f /consumer.natural_persons.sql `

#  Câu lệnh kiểm tra các truy vấn đang chạy
`` SELECT pid,
       usename,
       datname,
       state,
       query,
       wait_event_type,
       wait_event,
       backend_start,
       xact_start,
       query_start,
       now() - query_start AS duration,
       client_addr
FROM pg_stat_activity
WHERE state = 'active'
  AND query NOT ILIKE '%pg_stat_activity%'
ORDER BY query_start DESC; ``

# Nếu muốn dừng truy vấn đang chạy quá lâu:
``
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'active'
  AND now() - query_start > interval '5 minutes';

``