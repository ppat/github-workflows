FROM alpine:3.24.4@sha256:93b41ef40b1677fce8fcc64ff4af09daddfacf5040afde618bc46c1e2d1cc7d4

# hadolint ignore=DL3018
RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add curl

ENTRYPOINT ["/bin/sh"]
