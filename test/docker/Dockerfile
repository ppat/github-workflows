FROM alpine:3.24.4@sha256:f59abe656b692d901e184be3445e084786602108599d2a51d229c0f5a48c71bf

# hadolint ignore=DL3018
RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add curl

ENTRYPOINT ["/bin/sh"]
