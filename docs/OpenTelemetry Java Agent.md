Dùng **OpenTelemetry Java Agent** là cách nhanh nhất để có tracing tự động, không cần sửa code, rất phù hợp với Spring Boot 3.4.4 + Kotlin.

Dưới đây là các bước bạn cần làm:

---

## 1. Tải OpenTelemetry Java Agent

Bạn tải file agent mới nhất ở đây:
[https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest)

Tìm file dạng:
`opentelemetry-javaagent.jar`

---

## 2. Chạy ứng dụng với Java Agent

Giả sử bạn chạy app Spring Boot bằng câu lệnh:

```bash
java -jar myapp.jar
```

Bạn sửa lại thành:

```bash
java -javaagent:/path/to/opentelemetry-javaagent.jar \
     -Dotel.service.name=my-springboot-app \
     -Dotel.exporter.otlp.endpoint=http://localhost:4317 \
     -Dotel.traces.exporter=otlp \
     -Dotel.metrics.exporter=none \
     -Dotel.resource.attributes=deployment.environment=dev \
     -jar myapp.jar
```

Giải thích:

* `-javaagent:` là chỉ định agent tự động instrument.
* `otel.service.name` là tên service bạn đặt, dùng để phân biệt trace.
* `otel.exporter.otlp.endpoint` trỏ đến OpenTelemetry Collector hoặc backend (Tempo, Jaeger).
* `otel.traces.exporter=otlp` chỉ gửi trace qua OTLP protocol.
* `otel.metrics.exporter=none` nếu bạn không muốn gửi metrics qua agent này (có thể tắt).
* `otel.resource.attributes` thêm thông tin metadata cho service.

---

## 3. Chuẩn bị backend nhận trace

Bạn cần có **OpenTelemetry Collector** hoặc **Grafana Tempo** chạy trên `http://localhost:4317` (mặc định cổng OTLP gRPC).

Bạn có thể dùng docker-compose đơn giản:

```yaml
version: '3'
services:
  tempo:
    image: grafana/tempo:latest
    ports:
      - "4317:4317"   # OTLP gRPC receiver
```

---

## 4. Mở Grafana để xem trace

* Cài datasource Tempo trong Grafana.
* Mở Explore, chọn datasource Tempo, tìm trace theo `service.name=my-springboot-app`.

---

## 5. Các lưu ý nhỏ

* Agent hỗ trợ instrument tự động Spring MVC, RestTemplate, WebClient, JDBC, Kafka, v.v.
* Bạn không cần viết thêm annotation hay sửa code gì.
* Nếu bạn muốn bật metrics hoặc logs, có thể thêm config hoặc agent khác.
* Tăng sampling rate nếu dev để lấy nhiều trace hơn.

---

Nếu bạn cần, mình có thể giúp bạn viết file `docker-compose.yml` chạy Tempo + Grafana đơn giản để test cùng Java Agent luôn. Bạn muốn không?


## Run record-backend with .jar in opentelemetry
`` 
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \
     -javaagent:/home/dgwo/Documents/joinsure-record-backend/libs/opentelemetry-javaagent.jar \
     -Dotel.exporter.otlp.endpoint=http://localhost:4318 \
     -Dotel.service.name=record-backend \
     -Dotel.traces.exporter=logging \
     -Dotel.metrics.exporter=logging \
     -Dotel.logs.exporter=none \
     -Dotel.resource.attributes=deployment.environment=dev \
     -jar ./console/build/libs/console-0.0.1-SNAPSHOT.jar

``