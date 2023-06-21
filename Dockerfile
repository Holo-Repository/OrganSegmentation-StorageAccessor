FROM golang:1.17 AS build
RUN mkdir /workspace
WORKDIR /workspace
COPY api ./api
COPY cmd ./cmd
COPY internal ./internal
COPY third_party ./third_party

ENV CGO_ENABLED=0
RUN apt update && apt install ca-certificates libgnutls30 -y
RUN go mod init holo-storage-accessor
RUN go mod tidy
RUN go get -u github.com/gin-gonic/gin@v1.8.1
RUN go get -u github.com/Azure/azure-storage-blob-go/azblob@v0.11.0
RUN go build -installsuffix cgo -o holo-storage-accessor cmd/holo-storage-accessor/main.go

FROM scratch AS runtime
ENV GIN_MODE=release
COPY --from=build /workspace/third_party ./third_party
COPY --from=build /workspace/api ./api
COPY --from=build /workspace/holo-storage-accessor ./
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 3200
ENTRYPOINT ["./holo-storage-accessor"]
