# Hugo bin

FROM alpine:3.8

ENV HUGO_VERSION 0.45.1
ENV HUGO_SHA256 e10e4162d4d568b92e3c8b49efeb1fc3fd6310138dc5d7a63b86b852d37af158

RUN set -xe \
  && mkdir -p /data /usr/src/hugo \
  && wget -O hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/v"$HUGO_VERSION"/hugo_"$HUGO_VERSION"_Linux-64bit.tar.gz \
  && echo "$HUGO_SHA256 *hugo.tar.gz" | sha256sum -c - \
  && tar -xzf hugo.tar.gz -C /usr/src/hugo \
  && mv /usr/src/hugo/hugo /usr/bin/hugo \
  && rm -rf hugo.tar.gz /usr/src

WORKDIR /data

ENTRYPOINT ["/usr/bin/hugo"]

EXPOSE 1313
