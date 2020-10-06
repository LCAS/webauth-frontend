FROM node:14-alpine3.12

# Change global package directory. This allow packages to be installed
# globally without root user.
ENV NPM_CONFIG_PREFIX=~/.npm-global
RUN echo "export PATH=${PATH}:/home/node/.npm-global/bin" > /home/node/.profile

RUN su node -c 'npm install -g @angular/cli@latest'

# Other useful tools.
RUN apk update \
    && apk add --no-cache \
      bash \
      curl \
      git \
    && rm -r /var/cache/apk/*

ENV HOME /home/node
USER node:node
CMD ["/bin/bash", "-l"]
