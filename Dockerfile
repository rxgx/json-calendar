FROM jenkins:jenkins

WORKDIR /usr/local/json-calendar
COPY . /usr/local/json-calendar
RUN npm ci
CMD ["npm", "t"]
