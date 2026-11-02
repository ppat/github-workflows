FROM alpine:3.24.3@sha256:be2656061b536c1883c4034790e21d0a09c5aaaf51968b89368a3c0371ea2c9a

# hadolint ignore=DL3018
RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add curl

ENTRYPOINT ["/bin/sh"]
