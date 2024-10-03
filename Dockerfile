FROM node:22-alpine

# App working directory
#
WORKDIR /app

# Copy over the application package files to the app working directory
#
COPY package.json package-lock.json ./

# The chromium binary is not available for ARM64 architecture (i.e., Apple Silicon).
# Chromium is used by the Puppeteer library when running tests.
# https://github.com/puppeteer/puppeteer/issues/7740#issuecomment-1016083451.
#
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

# Determine if the current architecture is ARM64. If it is, then set skip flag to
# false so that chromium install will occur.
RUN if [ "$(uname -m)" = "arm64" ]; then \
      export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false; \
    fi

RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=$PUPPETEER_SKIP_CHROMIUM_DOWNLOAD npm install

COPY . .

CMD ["npm", "start"]