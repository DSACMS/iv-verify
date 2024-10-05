FROM node:22-alpine

# App working directory
#
WORKDIR /app

# Copy over the package files to the app working directory
#
COPY package.json package-lock.json ./

# Chromium is needed for some testing libraries, but is not available on
# ARM64 architecture (i.e., Apple Silicon). Set a flag to skip the chromium
# download unless the current architecture is ARM64.
#
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN if [ "$(uname -m)" = "arm64" ]; then \
      export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false; \
    fi

RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=$PUPPETEER_SKIP_CHROMIUM_DOWNLOAD npm install

COPY . .

CMD ["npm", "start"]