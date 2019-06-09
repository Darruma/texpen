FROM node:10
WORKDIR /usr/src/texpen
COPY package*.json ./
RUN npm install
COPY . .
RUN cd frontend/ && npm install && npm run build
CMD ["npm","start"]
EXPOSE 3006

